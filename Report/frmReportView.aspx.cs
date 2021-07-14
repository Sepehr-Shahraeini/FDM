using DevExpress.DataAccess.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Report
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
    

            string apiUrl = WebConfigurationManager.AppSettings["api_url"];
            string apiUrlExt = WebConfigurationManager.AppSettings["api_url_ext"];
            string type = Request.QueryString["type"];
            if (string.IsNullOrEmpty(type))
                type = "1";
            JsonDataSource dataSource = null;
            switch (type)
            {
                case "8":
                    string apt = Request.QueryString["apt"];
                    string airline = Request.QueryString["airline"];
                    string aptdt = Request.QueryString["dt"];
                    string aptuser = Request.QueryString["user"];
                    string aptphone = Request.QueryString["phone"];
                    var rptapt = new rptApt();
                    dataSource = new JsonDataSource();

                    dataSource.JsonSource = new UriJsonSource(new Uri(apiUrlExt + "api/flights/apt?apt="+apt+"&airline="+airline+"&dt="+ aptdt+"&user="+aptuser+"&phone="+aptphone));
                    dataSource.Fill();
                    rptapt.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptapt);
                    break;
                case "9":
                    string apti = Request.QueryString["apt"];
                    string airlinei = Request.QueryString["airline"];
                    string aptdti = Request.QueryString["dt"];
                    string aptuseri = Request.QueryString["user"];
                    string aptphonei = Request.QueryString["phone"];
                    var rptapti = new rptAptInt();
                    dataSource = new JsonDataSource();

                    dataSource.JsonSource = new UriJsonSource(new Uri(apiUrlExt + "api/flights/apt?apt=" + apti + "&airline=" + airlinei + "&dt=" + aptdti + "&user=" + aptuseri + "&phone=" + aptphonei));
                    dataSource.Fill();
                    rptapti.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptapti);
                    break;
                case "10":
                    string aptir = Request.QueryString["apt"];
                    string airlineir = Request.QueryString["airline"];
                    string aptdtfromir = Request.QueryString["dtfrom"];
                    string aptdttoir = Request.QueryString["dtto"];
                    
                    var rptaptir = new RptAptRange();
                    dataSource = new JsonDataSource();

                    dataSource.JsonSource = new UriJsonSource(new Uri(apiUrlExt + "api/flights/apt/range/1?apt=" + aptir + "&airline=" + airlineir + "&dtfrom=" + aptdtfromir +"&dtto="+aptdttoir));
                    dataSource.Fill();
                    rptaptir.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptaptir);
                    break;
                case "1":
                    string year = Request.QueryString["year"];
                    string month = Request.QueryString["month"];
                    var rptFlight = new RptFormA();
                    dataSource = new JsonDataSource();
                    dataSource.JsonSource = new UriJsonSource(new Uri(apiUrl + "odata/forma/month/"+year+"/"+month));
                    dataSource.Fill();
                    rptFlight.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptFlight);
                    break;
                case "5":
                    string year1 = Request.QueryString["year"];
                    
                    var rptFormAYear = new RptFormAYear();
                    dataSource = new JsonDataSource();
                    dataSource.JsonSource = new UriJsonSource(new Uri(apiUrl + "odata/forma/year/" + year1 ));
                    dataSource.Fill();
                    rptFormAYear.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptFormAYear);
                    break;
                case "2":
                    string year2 = Request.QueryString["year"];
                    string month2 = Request.QueryString["month"];
                    var rptmovaled = new RptMovaled();
                    dataSource = new JsonDataSource();
                    dataSource.JsonSource = new UriJsonSource(new Uri(apiUrl + "odata/forma/month/" + year2 + "/" + month2));
                    dataSource.Fill();
                    rptmovaled.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptmovaled);
                    break;
                case "6":
                    string year3 = Request.QueryString["year"];
                    
                    var rptmovaledy = new rptMovaledYear();
                    dataSource = new JsonDataSource();
                    dataSource.JsonSource = new UriJsonSource(new Uri(apiUrl + "odata/forma/year/" + year3 ));
                    dataSource.Fill();
                    rptmovaledy.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptmovaledy);
                    break;
                case "3":
                    string period = Request.QueryString["p"];
                    string cats = Request.QueryString["cats"];
                    DateTime dt = Convert.ToDateTime(Request.QueryString["dt"]);
                    DateTime df = Convert.ToDateTime(Request.QueryString["df"]);
                    string dtstr =  (Request.QueryString["dt"]);
                    string dfstr = (Request.QueryString["df"]);
                     var rptDelay = new rptDelay(dt,df);
                     dataSource = new JsonDataSource();
                    var url = apiUrl + "odata/delays/periodic/report/" + period + "/" + cats + "?dt=" + dtstr + "&df=" + dfstr;
                     dataSource.JsonSource = new UriJsonSource(new Uri(url));
                     dataSource.Fill();
                    rptDelay.DataSource = dataSource;
                     ASPxWebDocumentViewer1.OpenReport(rptDelay);
                    break;

                case "4":
                    string crewid = Request.QueryString["id"];
                    var rpttc = new RptCabinTrainingCard();
                    dataSource = new JsonDataSource();
                    var urltc = apiUrl + "odata/employee/training/card/"+crewid;
                    dataSource.JsonSource = new UriJsonSource(new Uri(urltc));
                    dataSource.Fill();
                    rpttc.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rpttc);
                    break;
                case "7":
                    var rptfp = new rptRosterFP();
                    dataSource = new JsonDataSource();
                    dataSource.JsonSource = new UriJsonSource(new Uri("http://localhost:58908/odata/roster/report/fp?day=2021-03-13"));
                    dataSource.Fill();
                    rptfp.DataSource = dataSource;
                    ASPxWebDocumentViewer1.OpenReport(rptfp);
                    break;

                default:break;
            }

            ////////////////////////////////////////////////////////////

            //string df = Request.QueryString["df"];
            //string dt = Request.QueryString["dt"];

            //string type = Request.QueryString["type"];
            //if (string.IsNullOrEmpty(type))
            //    type = "1";


            //string airlineId = Request.QueryString["airline"];
            //if (string.IsNullOrEmpty(airlineId))
            //    airlineId = "-1";
            //string flightStatusId = Request.QueryString["status"];
            //if (string.IsNullOrEmpty(flightStatusId))
            //    flightStatusId = "-1";
            //string from = Request.QueryString["from"];
            //if (string.IsNullOrEmpty(from))
            //    from = "-1";
            //string to = Request.QueryString["to"];
            //if (string.IsNullOrEmpty(to))
            //    to = "-1";
            //string employeeId = Request.QueryString["id"];

            //JsonDataSource dataSource = null;

            //switch (type)
            //{

            //    case "1":
            //        var rptFlight = new RptFlight(df,dt);
            //        dataSource = new JsonDataSource();
            //        dataSource.JsonSource = new UriJsonSource(new Uri(apiUrl + "odata/crew/flights/app2/?id=" + employeeId + "&df=" + df + "&dt=" + dt + "&status=" + flightStatusId + "&airline=" + airlineId + "&report=" + type + "&from=" + from + "&to=" + to));
            //        dataSource.Fill();
            //        rptFlight.DataSource = dataSource;
            //        ASPxWebDocumentViewer1.OpenReport(rptFlight);
            //        break;
            //    case "easafcl16":
            //        var rptEASAFCL16 = new RptFlight();
            //        dataSource = new JsonDataSource();
            //        dataSource.JsonSource = new UriJsonSource(new Uri(apiUrl + "odata/crew/flights/app2/?id=" + employeeId + "&df=" + df + "&dt=" + dt + "&status=" + flightStatusId + "&airline=" + airlineId + "&report=" + type+"&from="+from+"&to="+to));
            //        dataSource.Fill();
            //        rptEASAFCL16.DataSource = dataSource;
            //        ASPxWebDocumentViewer1.OpenReport(rptEASAFCL16);
            //        break;
            //    default:
            //        break;

            //}



        }
    }
}