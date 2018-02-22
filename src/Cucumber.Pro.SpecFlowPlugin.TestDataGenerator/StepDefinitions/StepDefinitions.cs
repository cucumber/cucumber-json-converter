using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TechTalk.SpecFlow;

namespace Cucumber.Pro.SpecFlowPlugin.TestDataGenerator.StepDefinitions
{
    [Binding]
    public class StepDefinitions
    {
        [BeforeScenario("@failing-before")]
        public void Before()
        {
            throw new Exception("failing before hook");
        }
        [AfterScenario("@failing-after")]
        public void After()
        {
            throw new Exception("failing after hook");
        }

        [StepDefinition(".*pass.*")]
        public void PassingStep()
        {
        }

        [StepDefinition(".*fail.*")]
        public void FailingStep()
        {
            throw new Exception("this step failed");
        }

        [StepDefinition(".*pending.*")]
        public void PendingStep()
        {
            throw new PendingStepException();
        }

        private int decay = 0;
        [StepDefinition(".*decaying.*")]
        public void DecayingStep()
        {
            var failing = decay > 0;
            decay++;
            if (failing) throw new Exception("Decayed");
        }
    }
}
