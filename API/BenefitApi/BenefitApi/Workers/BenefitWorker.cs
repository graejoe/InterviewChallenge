using BenefitApi.Models;
using BenefitApi.Workers;
using Flurl;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BenefitApi
{
    public class BenefitWorker : BaseWorker<string, benefit>
    {
        public BenefitWorker(string _baseUrl) : base(_baseUrl)
        {
            
        }
        public override async Task<benefit> DoWork(string data)
        {
            WorkingData = data;
           //SetDefaults();
           // Validate();
            if(IsValidRequest)
            {
                return await Task.FromResult(await ProcessRequest());
            }

            return await Task.FromResult(new benefit());
        }

        public override Url GetFullUrl()
        {
            throw new NotImplementedException();
        }

        public override async Task<benefit> ProcessRequest()
        {
            benefit rtnVal = new benefit();
            rtnVal.dependentCost = 500;
            rtnVal.employeeCost = 1000;
            rtnVal.employeeDiscount = .10;

            return await Task.FromResult(rtnVal);
        }

        public override void SetDefaults()
        {
            throw new NotImplementedException();
        }

        public override void Validate()
        {
            throw new NotImplementedException();
        }
    }
}
