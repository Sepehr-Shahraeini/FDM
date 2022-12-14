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
    
    public partial class EmployeeCalendar
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public EmployeeCalendar()
        {
            this.EmployeeCalendarSpliteds = new HashSet<EmployeeCalendarSplited>();
        }
    
        public int Id { get; set; }
        public System.DateTime Date { get; set; }
        public int EmployeeId { get; set; }
        public int StatusId { get; set; }
        public Nullable<System.DateTime> DateStart { get; set; }
        public Nullable<System.DateTime> DateEnd { get; set; }
        public Nullable<System.DateTime> DateContact { get; set; }
        public Nullable<int> BoxId { get; set; }
        public Nullable<System.DateTime> DateCease { get; set; }
        public Nullable<bool> IsHomeBase { get; set; }
        public Nullable<int> FDPId { get; set; }
    
        public virtual BoxCrew BoxCrew { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<EmployeeCalendarSplited> EmployeeCalendarSpliteds { get; set; }
        public virtual FDP FDP { get; set; }
    }
}
