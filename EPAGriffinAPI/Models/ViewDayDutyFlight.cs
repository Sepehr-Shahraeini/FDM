//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EPAGriffinAPI.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class ViewDayDutyFlight
    {
        public System.DateTime Date { get; set; }
        public int CrewId { get; set; }
        public double Duty1 { get; set; }
        public double Duty7 { get; set; }
        public double Duty14 { get; set; }
        public double Duty28 { get; set; }
        public int Flight1 { get; set; }
        public int Flight28 { get; set; }
        public int FlightYear { get; set; }
        public int FlightCYear { get; set; }
    }
}
