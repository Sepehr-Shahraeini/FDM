using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using Microsoft.AspNet.OData.Extensions;
using System.Web.Http;

[assembly: OwinStartup(typeof(EPAGriffinAPI.Startup))]

namespace EPAGriffinAPI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
           
            ConfigureAuth(app);
            
            //HttpConfiguration config = new HttpConfiguration();
            //config.EnableDependencyInjection();
            //ConfigureAuth(app);

            ////app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            ////atrina
            //app.UseWebApi(config);
            //WebApiConfig.Register(config);
            GlobalConfiguration.Configuration.EnableDependencyInjection();
        }
    }
}
