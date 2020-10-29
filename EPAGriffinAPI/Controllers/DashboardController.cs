using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.OData;
using EPAGriffinAPI.Models;
using System.Web.Http.Description;
using System.Collections.Generic;
using System;
using System.Data.Entity.Validation;
using System.Web.Http.Cors;
using System.Web.Http.ModelBinding;
using EPAGriffinAPI.DAL;
using System.Text;
using System.Configuration;

namespace EPAGriffinAPI.Controllers
{
    public class DashboardController : ApiController
    {
        private UnitOfWork unitOfWork = new UnitOfWork();

        [Route("odata/dashboard/total/{cid}/{mid}")]
       
        // [Authorize]
        public async Task<ViewModels.IDashboard>  GetDashboardLibraryByCustomerId(int cid,int mid)
        {
            try
            {
                ViewModels.IDashboard dto;
                if (mid == 2)
                {
                    dto = await unitOfWork.DashboardRepository.GetDashboardLibrary(cid);
                    return dto;
                }
                if (mid == 1)
                {
                    dto = await unitOfWork.DashboardRepository.GetDashboardProfile(cid);
                    return dto;
                }
                return null;
                // return db.ViewAirports.AsNoTracking() ;
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }



        }


        [Route("odata/dashboard/app/{cid}/{eid}")]

        // [Authorize]
        public async Task<ViewModels.IDashboard> GetAppDashboard(int cid, int eid)
        {
            try
            {
                ViewModels.IDashboard dto = await unitOfWork.DashboardRepository.GetAppDashboard(cid,eid);
                
                    return dto;
                
            }
            catch (Exception ex)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }



        }
        [Route("odata/dashboard/app/ftl/{eid}")]

        // [Authorize]
        public async Task<Models.ViewCrewTime> GetAppDashboardFTL( int eid)
        {
            try
            {
                Models.ViewCrewTime dto = await unitOfWork.DashboardRepository.GetAPPDashboardFTL( eid);

                return dto;

            }
            catch (Exception ex)
            {
                throw new HttpResponseException(HttpStatusCode.Unauthorized);
            }



        }
        [Route("odata/dashboard/flight/{cid}/")]

        // [Authorize]
        public async Task<IHttpActionResult> GetDashboardFlightByCustomerId(int cid, DateTime date)
        {
            date = date.Date;
            var sum = await unitOfWork.FlightRepository.GetFlightsSummary(cid, date);
            
            var result = new
            {
                count = sum.count,
                departed = sum.departed,
                arrived = sum.arrived,
                canceled = sum.canceled,
                redirected = sum.redirected,
                plannedtime = sum.plannedtime,
                actualtime = sum.actualtime,
                delay1 = sum.delay1,
                delay2 = sum.delay2,
                delaytotal = sum.delaytotal,
                delaytotalstr = sum.delaytotalstr,
                paxadult = sum.paxadult,
                paxchild = sum.paxchild,
                paxinfant = sum.paxinfant,
                paxtotal = sum.paxtotal,
                fuel = sum.fuel,
                cargo = sum.cargo,
                topdelays=sum.topdelays,
                paxload = sum.paxload,
            };


            return Ok(result);

        }


        [Route("bi/fuel/monthly/{year}")]

        // [Authorize]
        public async Task<IHttpActionResult> GetRptFuelMonthlyByYear(int year)
        {
            var result = await unitOfWork.DashboardRepository.GetRptFuelMonthlyByYear(year);

            return Ok(result);

        }
        [Route("bi/fuel/routes/year/{year}")]

        // [Authorize]
        public async Task<IHttpActionResult> GetRptFuelRoutesByYear(int year)
        {
            var result = await unitOfWork.DashboardRepository.GetRptFuelRoutesYearly(year);

            return Ok(result);

        }
        [Route("bi/fuel/daily/{from}/{to}")]

        // [Authorize]
        public async Task<IHttpActionResult> GetRptFuelDaily(string from,string to)
        {
            var fromparts = from.Split('-');
            var toparts = to.Split('-');
            var dfrom = (new DateTime(Convert.ToInt32(fromparts[0]), Convert.ToInt32(fromparts[1]), Convert.ToInt32(fromparts[2]))).Date;
            var dto = (new DateTime(Convert.ToInt32(toparts[0]), Convert.ToInt32(toparts[1]), Convert.ToInt32(toparts[2]))).Date;//.AddHours(23).AddMinutes(59).AddSeconds(59);
            var result = await unitOfWork.DashboardRepository.GetRptFuelDaily(dfrom,dto);

            return Ok(result);

        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                //db.Dispose();
                unitOfWork.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
