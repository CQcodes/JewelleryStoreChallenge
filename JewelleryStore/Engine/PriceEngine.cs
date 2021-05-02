using JewelleryStore.Model.Request;
using JewelleryStore.Model.Options;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JewelleryStore.Engine
{
    public interface IPriceEngine
    {
        double? CalculatePrice(CalculateRequest request);
    }
    public class PriceEngine: IPriceEngine
    {
        private JewelleryStoreOptions jewelleryStoreOptions;
        public PriceEngine(IOptions<JewelleryStoreOptions> _jewelleryStoreOptions)
        {
            jewelleryStoreOptions = _jewelleryStoreOptions.Value;
        }

        public double? CalculatePrice(CalculateRequest request)
        {
            if (request == null) return null;
            if (request.DiscountInPercentage != null && (request.DiscountInPercentage < 0 || request.DiscountInPercentage > 100)) return null;
            if (request.PricePerGram < 0) return null;
            if (request.WeightInGram < 0) return null;

            var discount = request.DiscountInPercentage ?? jewelleryStoreOptions.DefaultDiscount;

            return (request.PricePerGram * request.WeightInGram * (100 - discount)) / 100;
        }
    }
}
