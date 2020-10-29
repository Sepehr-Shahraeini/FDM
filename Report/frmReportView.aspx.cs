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
            string type = Request.QueryString["type"];
            if (string.IsNullOrEmpty(type))
                type = "1";
            JsonDataSource dataSource = null;
            switch (type)
            {
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