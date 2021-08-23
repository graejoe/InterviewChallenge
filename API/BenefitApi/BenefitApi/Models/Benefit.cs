using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BenefitApi.Models
{
    public class benefit
    {
        public double employeeCost { get; set; }
        public double dependentCost { get; set; }
        public double employeeDiscount { get; set; }
    }
}
