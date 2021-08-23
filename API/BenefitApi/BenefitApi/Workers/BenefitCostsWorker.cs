using BenefitApi.Models;
using BenefitApi.Workers;
using Flurl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BenefitApi
{
    public class BenefitCostsWorker : BaseWorker<List<beneficiary>, BenefitCost>
    {
        public BenefitCostsWorker(string _baseUrl) : base(_baseUrl)
        {

        }
        public override async Task<BenefitCost> DoWork(List<beneficiary> data)
        {
            WorkingData = data;
            //SetDefaults();
            // Validate();
            if (IsValidRequest)
            {
                return await Task.FromResult(await ProcessRequest());
            }

            return await Task.FromResult(new BenefitCost());
        }

        public override Url GetFullUrl()
        {
            throw new NotImplementedException();
        }

        public override async Task<BenefitCost> ProcessRequest()
        {
            //Should be stored in Benefit DB
            var employeeBenefit = await GetBenefit();

            //Get base paycheck
            BenefitCost benefitCost = new BenefitCost();

            //Calculate cost per family member
            foreach (beneficiary bene in WorkingData)
            {
                if (bene.type.Equals("1"))
                {
                    //apply discount where nessecary
                    if (CheckForDeduction(bene.name))
                    {
                        benefitCost.employeeDiscount = $"{bene.name} qualifies for a 10% discount";
                        benefitCost.employeeCost += employeeBenefit.employeeCost * (1.00 - employeeBenefit.employeeDiscount);
                    }
                    else
                        benefitCost.employeeCost += employeeBenefit.employeeCost;
                }
                else
                {
                    //apply discount where nessecary
                    if (CheckForDeduction(bene.name))
                    {
                        benefitCost.dependentsWithDiscounts.Add(bene.name);
                        benefitCost.dependentCost += employeeBenefit.dependentCost * (1.00 - employeeBenefit.employeeDiscount);

                    }
                    else
                        benefitCost.dependentCost += employeeBenefit.dependentCost;
                }
            }
            benefitCost.CalculateDiscountMessage();
            benefitCost.CalculateTotalCost();
            return await Task.FromResult(benefitCost);

        }

        public override void SetDefaults()
        {
            throw new NotImplementedException();
        }

        public override void Validate()
        {
            throw new NotImplementedException();
        }
        private bool CheckForDeduction(string name)
        {
            return (name.ToLower().StartsWith("a"));
        }
        private async Task<benefit> GetBenefit()
        {
            var beneWorker = new BenefitWorker("");
            return await beneWorker.DoWork(string.Empty);
        }
    }
}
