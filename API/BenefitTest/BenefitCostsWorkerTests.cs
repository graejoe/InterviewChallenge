using BenefitApi;
using Xunit;

namespace BenefitTest
{
   public class BenefitCostsWorkerTests
    {
        [Fact]
        public void BenefitCostsWorker_ReturnsClass_GivenConstructor_Test()
        {
            var cls = new BenefitCostsWorker("");
            Assert.IsType<BenefitCostsWorker>(cls);
        }

        [Theory]
        [InlineData("Alice", true)]
        [InlineData("alice", true)]
        [InlineData("Frank", false)]
        public void BenefitCostsWorker_ReturnsTrue_NameStartsWithA_Test(string name, bool expectedContains)
        {
            var cls = new BenefitCostsWorker("");
            Assert.Equal(cls.CheckForDeduction(name), expectedContains);
        }
    }
}
