using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading;
using System.Web;

namespace EPAGriffinAPI
{
    public class Email
    {
        string dispatchEmail = ConfigurationManager.AppSettings["email_dispatch"];
        string dispatchTitle = ConfigurationManager.AppSettings["email_dispatch_title"];
        string dispatchEmailPassword = "123456@aA";// "Ss12#$56&*90" ;//ConfigurationManager.AppSettings["email_dispatch_password"];
        string dispatchEmailHost = ConfigurationManager.AppSettings["email_dispatch_host"];
        string dispatchEmailPort = ConfigurationManager.AppSettings["email_dispatch_port"];
        string caoMSGEmail = ConfigurationManager.AppSettings["email_cao_message"];
        public bool SendEmailMVT( string body,string subject)
        {
             

            (new Thread(() =>
            {
                try
                {
                    var fromAddress = new MailAddress(dispatchEmail, dispatchTitle);
                    var toAddress = new MailAddress(caoMSGEmail, "CAO MSG");
                    string fromPassword = dispatchEmailPassword;

                   

                    var smtp = new SmtpClient
                    {
                        //EnableSsl=true,
                        Host = dispatchEmailHost,
                        Port = Convert.ToInt32(dispatchEmailPort),
                        // EnableSsl = true,
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        UseDefaultCredentials = false,
                        Credentials = new NetworkCredential(fromAddress.Address, fromPassword),
                          
                    };
                    smtp.Timeout = 5000;
                    using (var message = new MailMessage(fromAddress, toAddress)
                    {
                        Subject = subject,
                        Body = body,
                        IsBodyHtml = false,

                    })
                    {
                        //smtp.SendCompleted += (s, e) => {
                        //    smtp.Dispose();

                        //};
                        smtp.Send(message);
                    }

                    //////////////////////////////////////
                    //var smtp2 = new SmtpClient
                    //{
                    //    Host = dispatchEmailHost,
                    //    Port = Convert.ToInt32(dispatchEmailPort),
                    //    // EnableSsl = true,
                    //    DeliveryMethod = SmtpDeliveryMethod.Network,
                    //    UseDefaultCredentials = false,
                    //    Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
                    //};
                    //smtp2.Timeout = 5000;
                    //using (var message2 = new MailMessage(fromAddress, new MailAddress("v.moghaddam59@gmail.com", "CAO MSG"))
                    //{
                    //    Subject = subject,
                    //    Body = body,
                    //    IsBodyHtml = false,
                    //})
                    //{
                    //    //smtp.SendCompleted += (s, e) => {
                    //    //    smtp.Dispose();

                    //    //};
                    //    smtp2.Send(message2);
                    //}

                    /////////////////////////////////////////
                }
                catch (Exception ex){

                }
               



            })).Start();


            return true;
        }
    }
    public class Magfa
    {
        string username = ConfigurationManager.AppSettings["magfa_user"]; //"caspianline"; //"flypersia_48000";
        string password = ConfigurationManager.AppSettings["magfa_pass"]; // "ZQMihTmdLqCbnbrW"; //"YYDWMU5BAJQQHCuG";
        string domain = "magfa";
        string senderNumber = ConfigurationManager.AppSettings["magfa_no"]; // "3000748907"; //"300048000";
        public List<string> getStatus(List<Int64> refIds)
        {
            
            com.magfa.sms.SoapSmsQueuableImplementationService sq = new com.magfa.sms.SoapSmsQueuableImplementationService();
            sq.Credentials = new System.Net.NetworkCredential(username, password);
            sq.PreAuthenticate = true;

            //List<string> result = new List<string>();
            //foreach (var x in refIds)
            //{
            //    var str = "Unknown";
            //    var response = sq.getMessageStatus(x);
            //    switch (response)
            //    {
            //        case 1:
            //            str = "Sending";
            //            break;
            //        case 2:
            //            str = "Delivered";
            //            break;
            //        case 3:
            //            str = "Not Delivered";
            //            break;


            //        default:
            //            break;
            //    }
            //    result.Add(str);
            //}



            var response = sq.getRealMessageStatuses(refIds.ToArray());
            List<string> result = new List<string>();
            foreach (var x in response)
            {
                var str = "Unknown";
                switch (x)
                {
                    case 1:
                        str = "Delivered";
                        break;
                    case 2:
                        str = "Not Delivered To Phone";
                        break;
                    case 8:
                        str = "Delivered To ICT";
                        break;
                    case 16:
                        str = "Not Delivered To ICT";
                        break;
                    case 0:
                        str = "Sending Queue";
                        break;
                    default:
                        break;
                }
                result.Add(str);
            }


            return result;
        }
        public string getStatus(Int64 refid)
        {
            com.magfa.sms.SoapSmsQueuableImplementationService sq = new com.magfa.sms.SoapSmsQueuableImplementationService();
            sq.Credentials = new System.Net.NetworkCredential(username, password);
            sq.PreAuthenticate = true;

            var response = sq.getMessageStatus(refid);
            
             
                var str = "Unknown";
                switch (response)
                {
                    case 1:
                        str = "Delivered";
                        break;
                    case 2:
                        str = "Not Delivered To Phone";
                        break;
                    case 8:
                        str = "Delivered To ICT";
                        break;
                    case 16:
                        str = "Not Delivered To ICT";
                        break;
                    case 0:
                        str = "Sending Queue";
                        break;
                    default:
                        break;
                }
                
           


            return str;
        }
        public long[] enqueue(   int count,   String recipientNumber, String text)
        {
            try
            {
                com.magfa.sms.SoapSmsQueuableImplementationService sq = new com.magfa.sms.SoapSmsQueuableImplementationService();
                //if (useProxy)
                //{
                //    WebProxy proxy;
                //    proxy = new WebProxy(proxyAddress);
                //    proxy.Credentials = new NetworkCredential(proxyUsername, proxyPassword);
                //    sq.Proxy = proxy;
                //}
                sq.Credentials = new System.Net.NetworkCredential(username, password);
                sq.PreAuthenticate = true;
                long[] results;

                string[] messages;
                string[] mobiles;
                string[] origs;

                int[] encodings;
                string[] UDH;
                int[] mclass;
                int[] priorities;
                long[] checkingIds;

                messages = new string[count];
                mobiles = new string[count];
                origs = new string[count];

                encodings = new int[count];
                UDH = new string[count];
                mclass = new int[count];
                priorities = new int[count];
                checkingIds = new long[count];

                /*
                encodings = null;
                UDH = null;
                mclass = null;
                priorities = null;
                checkingIds = null;
                */
                for (int i = 0; i < count; i++)
                {
                    messages[i] = text;
                    mobiles[i] = recipientNumber;
                    origs[i] = senderNumber;

                    encodings[i] = -1;
                    UDH[i] = "";
                    mclass[i] = -1;
                    priorities[i] = -1;
                    checkingIds[i] = 200 + i;
                }
                var xxx = sq.Url;
                return sq.enqueue(domain, messages, mobiles, origs, encodings, UDH, mclass, priorities, checkingIds);


                ////////////////////////////////
                /////kakoli
                //// Credentials


                //// Service (Add a Web Reference)
                //com.magfa.sms.SoapSmsQueuableImplementationService service = new com.magfa.sms.SoapSmsQueuableImplementationService();

                //// Basic Auth
                //NetworkCredential netCredential = new NetworkCredential(username, password);
                //Uri uri = new Uri(service.Url);
                //ICredentials credentials = netCredential.GetCredential(uri, "Basic");

                //service.Credentials = credentials;
                //service.AllowAutoRedirect = true;

                //// Call
                //long[] resp = service.enqueue(domain,
                //    new string[] { "تست ارسال پيامک. Sample Text for test.", "Hi!" },
                //    new string[] { "09124449584", "09306678047" },
                //    new string[] { senderNumber },
                //    new int[] { 0 },
                //    new string[] { "" },
                //    new int[] { 0 },
                //    new int[] { 0 },
                //    new long[] { 198981, 123032 }
                //);
                //foreach (long r in resp)
                //{
                //    Console.WriteLine("send: " + r);
                //}
                //return resp;
                //////////////////////////////////////////
            }
            catch(Exception ex)
            {
                return new long[] { -1 };
            }
            
        }
    }


    public class Payamak
    {
        public void send(string mobile,string text)
        {
            string[] mobiles = new string[] { mobile};
            string[] texts = new string[] { text};
            long[] rec = null;
            byte[] status = null;
            payamak.Actions p = new payamak.Actions();
            var xxx=p.SendMultipleSMS("9125591790", "@khavaN559", mobiles, "10001223136323", texts, false, "", ref rec, ref status);
            var xxx2 = p.SendMultipleSMS("9125591790", "@khavaN559", mobiles, "5000127003476", texts, false, "", ref rec, ref status);
            var xxx3 = p.SendMultipleSMS("9125591790", "@khavaN559", mobiles, "30001223136323", texts, false, "", ref rec, ref status);
            var xxx4 = p.SendMultipleSMS("9125591790", "@khavaN559", mobiles, "100070", texts, false, "", ref rec, ref status);
            //5000127003476
            //30001223136323
            //100070
        }

    }
}