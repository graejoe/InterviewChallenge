using Flurl;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BenefitApi.Workers
{
    public abstract class BaseWorker<TInput, TOutput>
    {
        public TInput WorkingData
        {
            get;
            set;
        }

        public bool IsValidRequest { get; set; } = true;

        public string BaseUrl { get; set; }

        protected BaseWorker(string baseUrl)
        {
            BaseUrl = baseUrl;
        }

        public abstract Task<TOutput> DoWork(TInput data);
        public abstract void Validate();

        public abstract void SetDefaults();

        public abstract Url GetFullUrl();

        public abstract Task<TOutput> ProcessRequest();
    }
}
