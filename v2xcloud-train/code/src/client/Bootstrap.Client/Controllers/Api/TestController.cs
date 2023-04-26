using Bootstrap.Client.Infrastructure.Repositories;
using Bootstrap.Client.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bootstrap.Client.Controllers.Api
{
    [Route("api/[controller]/[action]/{id?}")]
    public class TestController : Controller
    {
        private readonly IRepository<ReseultTest, int> _reseultTestRepository;

        public TestController(IRepository<ReseultTest, int> reseultTestRepository)
        {
            _reseultTestRepository = reseultTestRepository;
        }

        [HttpGet]
        public object Getstr()
        {
            ReseultTest result = _reseultTestRepository.Single(a => a.id == 1);
            return result;
        }
    }

    
}
