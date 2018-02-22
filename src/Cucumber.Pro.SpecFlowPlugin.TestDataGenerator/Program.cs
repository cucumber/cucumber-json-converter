using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
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
            ProcessFeature("one-passing-scenario.feature");
        }

        private static void ProcessFeature(string featureFileName)
        {
            string baseName = Path.GetFileNameWithoutExtension(featureFileName);
            string className = baseName.ToIdentifier();
            NUnit.ConsoleRunner.Program.Main(new[]
            {
                Assembly.GetExecutingAssembly().Location,
                $"--test=Cucumber.Pro.SpecFlowPlugin.TestDataGenerator.Features.{className}Feature",
                "--inprocess"
            });
        }
    }
}
