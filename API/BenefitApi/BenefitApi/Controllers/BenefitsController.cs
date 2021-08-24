using BenefitApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

[assembly: InternalsVisibleTo("BenefitTest")]

namespace BenefitApi
{
    [Route("api/benefits")]
    [ApiController]
    public class BenefitsController : ControllerBase
    {
        [HttpPost]
        public async Task<string> Post([FromBody]IEnumerable<beneficiary> beneficiaries)
        {
            //Instead of receiving a list of beneficiaries you could pass the employee ID and retrieve beneficiaries from there

            var benefitCostsWorker = new BenefitCostsWorker("");
            return JsonConvert.SerializeObject(await benefitCostsWorker.DoWork(beneficiaries.ToList()));       
        }
        [HttpGet]
        public async Task<string> Get()
        {
            var payWorker = new PaycheckWorker("");
            return JsonConvert.SerializeObject(await payWorker.DoWork(DateTime.Today));
        }
    }

 
}
