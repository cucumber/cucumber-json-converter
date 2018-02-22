using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Cucumber.Pro.SpecFlowPlugin.Formatters;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using TechTalk.SpecFlow.Tracing;

namespace Cucumber.Pro.SpecFlowPlugin.TestDataGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            Environment.SetEnvironmentVariable("CUCUMBERPRO_LOGGING", "DEBUG", EnvironmentVariableTarget.Process);
            Environment.SetEnvironmentVariable("CUCUMBERPRO_PROJECTNAME", "test-prj", EnvironmentVariableTarget.Process);
            Environment.SetEnvironmentVariable("GIT_COMMIT", "test-sha", EnvironmentVariableTarget.Process);
            Environment.SetEnvironmentVariable("GIT_BRANCH", "test-master", EnvironmentVariableTarget.Process);
            Environment.SetEnvironmentVariable("CUCUMBERPRO_TESTING_DRYRUN", "true", EnvironmentVariableTarget.Process);
            Environment.SetEnvironmentVariable("CUCUMBERPRO_RESULTS_FILE", "results.json", EnvironmentVariableTarget.Process);

            var assemblyFolder = Path.GetDirectoryName(new Uri(Assembly.GetExecutingAssembly().CodeBase).LocalPath) ??
                                 Directory.GetCurrentDirectory(); // in the very rare case the assembly folder cannot be detected, we use current directory
            var featuresFolder = Path.GetFullPath(Path.Combine(assemblyFolder, "..", "..", "..", "..", "features"));

            ProcessFeature("one-passing-scenario.feature", assemblyFolder, featuresFolder);
        }

        private static void ProcessFeature(string featureFileName, string assemblyFolder, string featuresFolder)
        {
            string baseName = Path.GetFileNameWithoutExtension(featureFileName);
            string className = baseName.ToIdentifier();
            NUnit.ConsoleRunner.Program.Main(new[]
            {
                Assembly.GetExecutingAssembly().Location,
                $"--test=Cucumber.Pro.SpecFlowPlugin.TestDataGenerator.Features.{className}Feature",
                "--inprocess"
            });

            var jsonContent = File.ReadAllText(Path.Combine(assemblyFolder, "results.json"));
            var obj = JObject.Parse(jsonContent);
            var token = (JObject)obj.SelectToken("cucumberJson").First();
            var result = JsonConvert.SerializeObject(token, Formatting.Indented);
            File.WriteAllText(Path.Combine(featuresFolder, featureFileName + ".specflow.json"), result);
        }
    }
}
