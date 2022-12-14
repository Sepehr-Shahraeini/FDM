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
    
    public partial class ViewCrewCalendar
    {
        public int Id { get; set; }
        public System.DateTime Date { get; set; }
        public int EmployeeId { get; set; }
        public int StatusId { get; set; }
        public string Status { get; set; }
        public Nullable<System.DateTime> DateStart { get; set; }
        public Nullable<System.DateTime> DateEnd { get; set; }
        public Nullable<System.DateTime> DateContact { get; set; }
        public Nullable<int> BoxId { get; set; }
        public Nullable<System.DateTime> DateCease { get; set; }
        public Nullable<System.DateTime> DateStartLocal { get; set; }
        public Nullable<System.DateTime> DateEndLocal { get; set; }
        public Nullable<System.DateTime> DateContactLocal { get; set; }
        public Nullable<System.DateTime> DateCeaseLocal { get; set; }
        public Nullable<int> Duration { get; set; }
        public Nullable<decimal> Duty { get; set; }
        public int FDPReduction { get; set; }
        public int IsCeased { get; set; }
        public Nullable<System.DateTime> RestUntil { get; set; }
        public Nullable<System.DateTime> RestUntilLocal { get; set; }
        public Nullable<int> FDPId { get; set; }
        public Nullable<System.DateTime> DefaultReportingTime { get; set; }
        public Nullable<System.DateTime> DefaultReportingTimeLocal { get; set; }
        public Nullable<System.DateTime> DateEndActual { get; set; }
        public Nullable<System.DateTime> DateEndActualLocal { get; set; }
        public Nullable<System.DateTime> RestFrom { get; set; }
        public Nullable<System.DateTime> RestFromLocal { get; set; }
    }
}
