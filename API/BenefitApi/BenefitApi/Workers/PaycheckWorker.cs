using BenefitApi.Models;
using BenefitApi.Workers;
using Flurl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BenefitApi
{
    public class PaycheckWorker : BaseWorker<DateTime, Paycheck>
    {

        public PaycheckWorker(string _baseUrl) : base(_baseUrl)
        {

        }
        public override async Task<Paycheck> DoWork(DateTime data)
        {
            WorkingData = data;
            //SetDefaults();
            // Validate();
            if (IsValidRequest)
            {
                return await Task.FromResult(await ProcessRequest());
            }

            return await Task.FromResult(new Paycheck());
        }

        public override Url GetFullUrl()
        {
            throw new NotImplementedException();
        }

        public override async Task<Paycheck> ProcessRequest()
        {
            Paycheck rtnVal = new Paycheck();
            rtnVal.gross = 2000;
            rtnVal.paychecks = 26;

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
