using System;
using System.IO;
using System.Reflection;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NUnit.Common;
using TechTalk.SpecFlow.Tracing;

namespace Cucumber.Pro.SpecFlowPlugin.TestDataGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            Environment.SetEnvironmentVariable("CUCUMBERPRO_LOGGING", "INFO", EnvironmentVariableTarget.Process);
            Environment.SetEnvironmentVariable("CUCUMBERPRO_PROJECTNAME", "test-prj", EnvironmentVariableTarget.Process);
            Environment.SetEnvironmentVariable("GIT_COMMIT", "test-sha", EnvironmentVariableTarget.Process);
            Environment.SetEnvironmentVariable("GIT_BRANCH", "test-master", EnvironmentVariableTarget.Process);
            Environment.SetEnvironmentVariable("CUCUMBERPRO_TESTING_DRYRUN", "true", EnvironmentVariableTarget.Process);
            Environment.SetEnvironmentVariable("CUCUMBERPRO_RESULTS_FILE", "results.json", EnvironmentVariableTarget.Process);

            var assemblyFolder = Path.GetDirectoryName(new Uri(Assembly.GetExecutingAssembly().CodeBase).LocalPath) ??
                                 Directory.GetCurrentDirectory(); // in the very rare case the assembly folder cannot be detected, we use current directory
            var featuresFolder = Path.GetFullPath(Path.Combine(assemblyFolder, "..", "..", "..", "..", "features"));

            var featureFiles = Directory.GetFiles(featuresFolder, "*.feature");
            foreach (var featureFile in featureFiles)
            {
                Console.WriteLine($"Processing {featureFile}...");
                ProcessFeature(featureFile, assemblyFolder, featuresFolder);
            }
        }

        private static void ProcessFeature(string featureFileName, string assemblyFolder, string featuresFolder)
        {
            string baseName = Path.GetFileNameWithoutExtension(featureFileName);
            string className = baseName.ToIdentifier();
            NUnit.ConsoleRunner.Program.Main(new[]
            {
                Assembly.GetExecutingAssembly().Location,
                $"--test=Cucumber.Pro.SpecFlowPlugin.TestDataGenerator.Features.{className}Feature",
                "--inprocess",
                "--noresult",
                "--noh",
                "--noc"
            });

            var jsonContent = File.ReadAllText(Path.Combine(assemblyFolder, "results.json"));
            var obj = JObject.Parse(jsonContent);
            var token = obj.SelectToken("cucumberJson");
            var result = JsonConvert.SerializeObject(token, Formatting.Indented);
            result = result.Replace("\"uri\": \"src/Cucumber.Pro.SpecFlowPlugin.TestDataGenerator/.generated/", "\"uri\": \"features/");
            File.WriteAllText(Path.Combine(featuresFolder, featureFileName + ".specflow.json"), result);

            ConsoleOptions options = (ConsoleOptions)typeof(NUnit.ConsoleRunner.Program).GetField("Options", BindingFlags.Static | BindingFlags.NonPublic).GetValue(null);
            options.TestList.Clear();
            options.InputFiles.Clear();
        }
    }
}
