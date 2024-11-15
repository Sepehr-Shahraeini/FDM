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
    
    public partial class RptFuelMonthlyRegister
    {
        public Nullable<int> Year { get; set; }
        public Nullable<int> Month { get; set; }
        public string MonthName { get; set; }
        public string AircraftType { get; set; }
        public Nullable<int> TypeId { get; set; }
        public Nullable<int> RegisterID { get; set; }
        public string Register { get; set; }
        public Nullable<int> Legs { get; set; }
        public int PreLegs { get; set; }
        public decimal Uplift { get; set; }
        public decimal Used { get; set; }
        public decimal FPFuel { get; set; }
        public decimal PreUsed { get; set; }
        public Nullable<decimal> UpliftKilo { get; set; }
        public Nullable<decimal> UsedKilo { get; set; }
        public decimal PreUsedKilo { get; set; }
        public int FlightTime { get; set; }
        public int PreFlightTime { get; set; }
        public int BlockTime { get; set; }
        public int PreBlockTime { get; set; }
        public Nullable<decimal> UpliftPerLeg { get; set; }
        public Nullable<decimal> UpliftKiloPerLeg { get; set; }
        public Nullable<decimal> UsedKiloPerLeg { get; set; }
        public int TotalPax { get; set; }
        public int PreTotalPax { get; set; }
        public int TotalPaxAll { get; set; }
        public int PreTotalPaxAll { get; set; }
        public double Distance { get; set; }
        public double PreDistance { get; set; }
        public double DistanceKM { get; set; }
        public int Weight { get; set; }
        public int PreWeight { get; set; }
        public decimal WeightTone { get; set; }
        public decimal PreWeightTone { get; set; }
        public int PaxWeight { get; set; }
        public decimal PaxWeightTone { get; set; }
        public double WeightDistance { get; set; }
        public double WeightToneDistance { get; set; }
        public Nullable<decimal> UpliftPerPax { get; set; }
        public Nullable<decimal> UpliftPerWeight { get; set; }
        public Nullable<double> UpliftPerDistance { get; set; }
        public Nullable<double> UpliftPerDistanceKM { get; set; }
        public Nullable<double> UpliftPerWeightDistance { get; set; }
        public Nullable<double> UpliftPerWeightDistanceKM { get; set; }
        public Nullable<decimal> UsedPerPax { get; set; }
        public Nullable<decimal> UsedPerWeight { get; set; }
        public Nullable<double> UsedPerDistance { get; set; }
        public Nullable<double> UsedPerDistanceKM { get; set; }
        public double SeatDistanceKM { get; set; }
        public double SeatKiloDistanceKM { get; set; }
        public Nullable<double> UsedPerSeatDistanceKM { get; set; }
        public Nullable<double> UsedPerSeatKiloDistanceKM { get; set; }
        public double PaxDistanceKM { get; set; }
        public double PaxKiloDistanceKM { get; set; }
        public Nullable<double> UsedPerPaxDistanceKM { get; set; }
        public double PreUsedPerPaxDistanceKM { get; set; }
        public Nullable<double> UsedPerPaxKiloDistanceKM { get; set; }
        public double PreUsedPerPaxKiloDistanceKM { get; set; }
        public Nullable<decimal> UsedPerLeg { get; set; }
        public decimal PreUsedPerLeg { get; set; }
        public Nullable<decimal> UsedPerBlockTime { get; set; }
        public decimal PreUsedPerBlockTime { get; set; }
        public Nullable<decimal> UsedPerFlightTime { get; set; }
        public decimal PreUsedPerFlightTime { get; set; }
        public Nullable<double> UsedPerWeightDistance { get; set; }
        public double PreUsedPerWeightDistance { get; set; }
        public Nullable<double> UsedPerWeightToneDistance { get; set; }
        public double PreUsedPerWeightToneDistance { get; set; }
        public Nullable<decimal> UsedPerPaxBlockTime { get; set; }
        public decimal PreUsedPerPaxBlockTime { get; set; }
        public Nullable<decimal> UsedPerWeightToneBlockTime { get; set; }
        public decimal PreUsedPerWeightToneBlockTime { get; set; }
        public double WeightDistanceToneKM { get; set; }
        public Nullable<double> UsedPerWeightDistanceKM { get; set; }
    }
}
