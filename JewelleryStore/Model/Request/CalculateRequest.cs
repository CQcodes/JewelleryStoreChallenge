namespace JewelleryStore.Model.Request
{
    public class CalculateRequest
    {
        public double PricePerGram { get; set; }
        public double WeightInGram { get; set; }
        public double? DiscountInPercentage { get; set; }
    }
}
