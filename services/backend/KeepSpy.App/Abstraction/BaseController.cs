using AutoMapper;
using KeepSpy.Storage;
using Microsoft.AspNetCore.Mvc;

namespace KeepSpy.App.Abstraction
{
    public class BaseController: ControllerBase
    {
        protected KeepSpyContext Db { get; }
        protected IMapper Mapper { get; }

        public BaseController(KeepSpyContext db, IMapper mapper)
        {
            Db = db;
            Mapper = mapper;
        }
    }
}