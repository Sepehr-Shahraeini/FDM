using EPAGriffinAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Net;
using EPAGriffinAPI.ViewModels;

namespace EPAGriffinAPI.DAL
{
    public class DashboardRepository : Repository
    {
        public DashboardRepository(EPAGRIFFINEntities context)
               : base(context)
        {

        }

        public async Task<DashboardLibrary> GetDashboardLibrary(int cid)
        {
            var item = new DashboardLibrary();
            item.Publishers = await this.context.Organizations.CountAsync(q => q.TypeId == 77);
            item.Authors = await this.context.PersonMiscs.CountAsync(q => q.TypeId == 75);
            item.Journals = await this.context.Journals.CountAsync();
            //////////////////////////////////////////////////////////
            var libraryGroup = await (from x in context.ViewBooks
                                      where x.CustomerId == cid
                                      group x by new { x.TypeId, x.IsExposed } into g

                                      select new
                                      {
                                          TypeId = g.Key.TypeId,
                                          Exposed = g.Key.IsExposed,
                                          count = g.Count()
                                      }).ToListAsync();

            var libraryGroupSum = (from x in libraryGroup
                                   group x by x.TypeId into g
                                   orderby g.Key
                                   select new { TypeId = g.Key, count = g.Sum(e => e.count) }).ToList();

            item.DocumentsTotal = 0;
            item.BooksTotal = 0;
            item.PapersTotal = 0;
            item.VideosTotal = 0;

            item.DocumentsNotExposed = 0;
            item.BooksNotExposed = 0;
            item.PapersNotExposed = 0;
            item.VideosNotExposed = 0;


            foreach (var x in libraryGroupSum)
            {
                var notexposed = libraryGroup.FirstOrDefault(q => q.TypeId == x.TypeId && q.Exposed == 0);
                switch (x.TypeId)
                {
                    case 83:
                        item.BooksNotExposed = notexposed == null ? 0 : notexposed.count;
                        item.BooksTotal = x.count;
                        break;
                    case 84:
                        item.PapersTotal = x.count;
                        item.PapersNotExposed = notexposed == null ? 0 : notexposed.count;
                        break;
                    case 85:
                        item.VideosNotExposed = notexposed == null ? 0 : notexposed.count;
                        item.VideosTotal = x.count;
                        break;
                    case 86:
                        item.DocumentsNotExposed = notexposed == null ? 0 : notexposed.count;
                        item.DocumentsTotal = x.count;
                        break;
                    default:
                        break;
                }



            }
            var careless = await this.context.SumCarelessEmployeeTotals.FirstOrDefaultAsync(q => q.CustomerId == cid);
            item.Careless = careless == null ? 0 : (int)careless.Count;

            var carelessTypes = await this.context.SumCarelessEmployees.Where(q => q.CustomerId == cid).ToListAsync();
            foreach (var y in carelessTypes)
            {
                switch (y.TypeId)
                {
                    case 83:
                        item.CarelessBook = (int)y.Count;
                        break;
                    case 84:
                        item.CarelessPaper = (int)y.Count;
                        break;
                    case 85:
                        item.CarelessVideo = (int)y.Count;
                        break;
                    case 86:
                        item.CarelessDocument = (int)y.Count;
                        break;
                    default:
                        break;
                }
            }

            item.DownloadTotal = await this.context.ViewBookApplicableEmployees.Where(q => q.CustomerId == cid && q.IsDownloaded == true).CountAsync();

            var download = await this.context.SumLibraryDownloadByMonths.Where(q => q.CustomerId == cid).OrderBy(q => q.Year).ThenBy(q => q.Month).ToListAsync();
            item.Download = new List<DateRate>();
            foreach (var x in download)
            {
                item.Download.Add(new DateRate()
                {
                    Month = x.Month,
                    MonthName = x.MonthName,
                    Year = x.Year,
                    Total = (int)x.Count
                });
            }
            var add = await this.context.SumLibraryAddedByMonths.Where(q => q.CustomerId == cid).OrderBy(q => q.Year).ThenBy(q => q.Month).ToListAsync();
            item.Add = new List<DateRate>();
            foreach (var x in add)
            {
                item.Add.Add(new DateRate()
                {
                    Month = x.Month,
                    MonthName = x.MonthName,
                    Year = x.Year,
                    Total = (int)x.Count
                });
            }
            //////////////////////////////////////////////


            return item;
            // return await this.context.UserActivityMenuHits.FirstOrDefaultAsync(q => q.UserId == dto.UserId && q.CustomerId == dto.CustomerId && q.ModuleId == dto.ModuleId && q.Key == dto.Key);
        }
        internal async Task<ViewCrewTime> GetAPPDashboardFTL(int eid)
        {
            var dt = DateTime.UtcNow;
            var day = DateTime.Now.Date;
            var FTL = await this.context.ViewCrewTimes.Where(q => q.CDate == day && q.Id == eid).FirstOrDefaultAsync();
            return FTL;
        }
        internal async Task<DashboardClienApp> GetAppDashboard(int cid, int eid)
        {
            var item = new DashboardClienApp()
            {
                Library = new List<TileAlert>(),
            };
            var dt = DateTime.UtcNow;
            var day = DateTime.Now.Date;
            var query = await (//from x in this.context.ViewFlightCrewNews
                from x in this.context.ViewFlightCrewXes

                where x.CrewId == eid && x.STD >= dt && x.FlightStatusId == 1
                //&& x.FlightStatusID==15
                orderby x.STD
                select x
                 ).FirstOrDefaultAsync();
            item.NextFlight = query;

            item.FTL = new ViewCrewTime(); //await this.context.ViewCrewTimes.Where(q => q.CDate == day && q.Id == eid).FirstOrDefaultAsync();

            var library = await this.context.SumEmployeeLibraryAlerts.Where(q => q.EmployeeId == eid && q.CustomerId == cid).OrderBy(q => q.TypeId).ToListAsync();
            foreach (var x in library)
            {
                if (x.TypeId == 83 && x.Count > 0)
                {
                    item.Library.Add(new TileAlert()
                    {
                        Type = 83,
                        Caption = "Book" + (x.Count > 1 ? "s" : ""),
                        Total = x.Count,
                        Remark = "need" + (x.Count == 1 ? "s" : "") + " your attention.",

                    });
                }
                if (x.TypeId == 84 && x.Count > 0)
                {
                    item.Library.Add(new TileAlert()
                    {
                        Type = 84,
                        Caption = "Paper" + (x.Count > 1 ? "s" : ""),
                        Total = x.Count,
                        Remark = "need" + (x.Count == 1 ? "s" : "") + " your attention.",

                    });
                }
                if (x.TypeId == 85 && x.Count > 0)
                {
                    item.Library.Add(new TileAlert()
                    {
                        Type = 85,
                        Caption = "Video" + (x.Count > 1 ? "s" : ""),
                        Total = x.Count,
                        Remark = "need" + (x.Count == 1 ? "s" : "") + " your attention.",

                    });
                }
                if (x.TypeId == 86 && x.Count > 0)
                {
                    item.Library.Add(new TileAlert()
                    {
                        Type = 86,
                        Caption = "Document" + (x.Count > 1 ? "s" : ""),
                        Total = x.Count,
                        Remark = "need" + (x.Count == 1 ? "s" : "") + " your attention.",

                    });
                }
            }

            var notification = await this.context.Notifications.Where(q => q.UserId == eid && q.DateAppVisited == null).CountAsync();
            var lastNote = await this.context.ViewNotifications.Where(q => q.UserId == eid && q.DateAppVisited == null).OrderByDescending(q => q.DateSent).FirstOrDefaultAsync();
            item.Nots = notification;
            if (lastNote != null)
            {
                item.LastNot = lastNote.Type;
                item.LastNotDate = lastNote.DateSent;
                item.LastNotSender = lastNote.Sender;
                item.LastNotAbs = lastNote.Abstract;
            }
            return item;
        }

        public async Task<DashboardProfile> GetDashboardProfile(int cid)
        {
            var item = new DashboardProfile();

            item.EmployeesJobGroup = await this.context.SumEmployeeJobGroups.Where(q => q.CustomerId == cid).ToListAsync();
            item.EmployeesLocation = await this.context.SumEmployeeLocations.Where(q => q.CustomerId == cid).ToListAsync();
            item.EmployeesStudyField = await this.context.SumEmployeeStudyFields.Where(q => q.CustomerId == cid).ToListAsync();

            item.EmployeesDegree = await this.context.SumEmployeeDegrees.Where(q => q.CustomerId == cid).ToListAsync();
            item.EmployeeSex = await this.context.SumEmployeeSexes.Where(q => q.CustomerId == cid).ToListAsync();
            item.EmployeesAge = await this.context.SumEmployeeAges.Where(q => q.Id == cid).FirstOrDefaultAsync();
            item.EmployeeMaritalStatus = await this.context.SumEmployeeMaritalStatus.Where(q => q.CustomerId == cid).ToListAsync();
            item.EmployeesExp = await this.context.SumEmployeeExps.Where(q => q.Id == cid).FirstOrDefaultAsync();

            var courses = await this.context.SumActiveCourses.Where(q => q.CustomerId == cid).ToListAsync();
            foreach (var x in courses)
            {
                switch (x.StatusId)
                {
                    case 1:
                        item.RegisteringCourse = new TitleCourse()
                        {
                            Assigned = x.Assigned,
                            Registered = x.Registered,
                            UnRegistered = x.Unregistered,
                            Total = x.Count

                        };
                        break;
                    case 2:
                        item.ActiveCourse = new TitleCourse()
                        {
                            Total = x.Count,
                            Assigned = x.Assigned,
                            Learner = x.ActiveLearner,
                            Canceled = x.Canceled,
                        };
                        break;
                    case 3:
                        item.CompletedCourse = new TitleCourse()
                        {
                            Learner = x.DoneLearner,
                            Failed = x.Failed,
                            Passed = x.Passed,
                            Total = x.Count
                        };
                        break;
                    default:
                        break;
                }
            }

            var dateAlert = await this.context.SumEmployeeDateAlerts.FirstOrDefaultAsync(q => q.Id == cid);
            item.Passport = new TileAlert() { Expired = dateAlert.PassportExpired, Expiring = dateAlert.PassportExpiring };
            item.NDT = new TileAlert() { Expiring = dateAlert.NDTExpiring, Expired = dateAlert.NDTExpired };
            item.CAO = new TileAlert() { Expired = dateAlert.CAOExpired, Expiring = dateAlert.CAOExpiring };
            item.Medical = new TileAlert() { Expired = dateAlert.MedicalExpired, Expiring = dateAlert.MedicalExpiring };

            var certificate = await this.context.SumCertificateStatus.FirstOrDefaultAsync(q => q.Id == cid);
            item.Certificate = new TileAlert() { Expired = certificate.Expired, Expiring = certificate.Expiring, Valid = certificate.Valid, Total = certificate.Valid + certificate.Expiring + certificate.Expired };

            item.CertificatesTypes = await this.context.SumCertificateTypes.Where(q => q.CustomerId == cid).ToListAsync();



            return item;
        }

        public async Task<object> GetRptFuelMonthlyByYear(int year)
        {
            var query = from x in this.context.RptFuelMonthlyCals
                        where x.Year == year
                        select x;
            var ds = await query.OrderBy(q => q.Year).ThenBy(q => q.Month).ToListAsync();
            var used = ds.Sum(q => q.UsedKilo);

            var uplift = ds.Sum(q => q.UpliftKilo);
            var usedAvg = used > 0 ? Math.Round((double)ds.Average(q => q.UsedKilo), 2, MidpointRounding.AwayFromZero) : 0;
            var upliftAvg = uplift > 0 ? Math.Round((double)ds.Average(q => q.UpliftKilo), 2, MidpointRounding.AwayFromZero) : 0;
            var legs = ds.Sum(q => q.Legs);
            var legsAvg = legs > 0 ? Math.Round(ds.Average(q => (int)q.Legs), 2, MidpointRounding.AwayFromZero) : 0;
            var pax = ds.Sum(q => q.TotalPax);
            var paxAvg = pax > 0 ? Math.Round(ds.Average(q => q.TotalPax), 2, MidpointRounding.AwayFromZero) : 0;
            var weight = ds.Sum(q => q.WeightTone);
            var weightAvg = weight > 0 ? Math.Round(ds.Average(q => q.WeightTone), 2, MidpointRounding.AwayFromZero) : 0;
            var distance = ds.Sum(q => q.DistanceKM);
            var distanceAvg = distance > 0 ? Math.Round(ds.Average(q => q.DistanceKM), 2, MidpointRounding.AwayFromZero) : 0;


            var used2 = ds.Sum(q => q.Used);
            var weight2 = ds.Sum(q => q.Weight);
            var usedPerPaxAvg = used2 == 0 || pax == 0 ? 0 : Math.Round((double)used2 * 1.0 / pax, 2, MidpointRounding.AwayFromZero);
            var usedPerLegAvg = used2 == 0 || legs == 0 || legs == null ? 0 : Math.Round((double)used2 * 1.0 / (int)legs, 2, MidpointRounding.AwayFromZero);
            var usedPerWeight = used2 == 0 || weight2 == 0 ? 0 : Math.Round((double)used2 * 1.0 / weight2, 2, MidpointRounding.AwayFromZero);
            var usedPerDistance = used2 == 0 || distance == 0 ? 0 : Math.Round((double)used2 * 1.0 / distance, 2, MidpointRounding.AwayFromZero);
            return new
            {
                used,
                uplift,
                usedAvg,
                upliftAvg,
                legs,
                legsAvg,
                pax,
                paxAvg,
                weight,
                weightAvg,
                distance,
                distanceAvg,


                usedPerPaxAvg,
                usedPerLegAvg,
                usedPerWeight,
                usedPerDistance,
                items = ds,
            };
        }

        public async Task<object> GetRptFuelDaily(DateTime dfrom, DateTime dto)
        {
            var query = from x in this.context.RptFuelDailyCals
                        where x.LocalDate >= dfrom && x.LocalDate <= dto
                        select x;
            var ds = await query.OrderBy(q => q.LocalDate).ToListAsync();
            var used = ds.Sum(q => q.UsedKilo);
            var uplift = ds.Sum(q => q.UpliftKilo);
            var usedAvg = Math.Round((double)ds.Average(q => q.UsedKilo), 2, MidpointRounding.AwayFromZero);
            var upliftAvg = Math.Round((double)ds.Average(q => q.UpliftKilo), 2, MidpointRounding.AwayFromZero);
            var legs = ds.Sum(q => q.Legs);
            var legsAvg = Math.Round(ds.Average(q => (int)q.Legs), 2, MidpointRounding.AwayFromZero);
            var pax = ds.Sum(q => q.TotalPax);
            var paxAvg = Math.Round(ds.Average(q => q.TotalPax), 2, MidpointRounding.AwayFromZero);
            var weight = ds.Sum(q => q.WeightTone);
            var weightAvg = Math.Round(ds.Average(q => q.WeightTone), 2, MidpointRounding.AwayFromZero);
            var distance = ds.Sum(q => q.DistanceKM);
            var distanceAvg = Math.Round(ds.Average(q => q.DistanceKM), 2, MidpointRounding.AwayFromZero);
            return new
            {
                used,
                uplift,
                usedAvg,
                upliftAvg,
                legs,
                legsAvg,
                pax,
                paxAvg,
                weight,
                weightAvg,
                distance,
                distanceAvg,
                items = ds,
            };
        }


        public async Task<object> GetRptFuelRoutesYearly(int year)
        {
            var query = this.context.RptFuelYearlyRoutes.Where(q => q.Year == year).OrderByDescending(q=>q.Used);
            var items = await query.ToListAsync();
            var usedAvg = Math.Round((double)items.Average(q => q.UsedKilo), 2, MidpointRounding.AwayFromZero);
            var usedLegAvg = Math.Round((double)items.Average(q => q.UsedKiloPerLeg), 2, MidpointRounding.AwayFromZero);
            var usedPaxAvg = Math.Round((double)items.Average(q => q.UsedPerPax), 2, MidpointRounding.AwayFromZero);
            //var usedAvgKilo = Math.Round((double)items.Average(q => q.Used), 2, MidpointRounding.AwayFromZero);
            return new
            {
                items,
                usedAvg,
                usedLegAvg,
                usedPaxAvg
            };
        }

    }
}