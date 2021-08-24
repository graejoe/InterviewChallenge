using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BenefitApi.Models
{
    public class BenefitCost
    {
        public double employeeCost;
        public string employeeDiscount = string.Empty;
        public double dependentCost;
        public string dependentDiscount = string.Empty;
        public double totalCost;


        public List<string> dependentsWithDiscounts = new List<string>();

        public void CalculateDiscountMessage()
        {
            string temp = string.Empty;
            
            foreach (string dependent in dependentsWithDiscounts)
            {
                temp = String.IsNullOrEmpty(temp) ? temp + dependent : temp + $" & {dependent}";
            }
            if (dependentsWithDiscounts.Count == 0) dependentDiscount = temp;
            else dependentDiscount = $"10% discount applied to {temp}.";
        }
        public void CalculateTotalCost()
        {
            totalCost = employeeCost + dependentCost;
        }

    }
}
