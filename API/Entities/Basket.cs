using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public required string ClientId { get; set; }
        public string? ClientSecret { get; set; }
        public string? PaymentIntentId { get; set; }
        public List<BasketItem> Items { get; set; }
        public virtual Restaurant Restaurant { get; set; } = null!;
        public virtual int RestaurantId { get; set; }

        public Basket() 
        {
            Items = new List<BasketItem>();
        }

        public void AddItem(Product product, int quantity)
        {
            if (Items.All(x => x.ProductId != product.Id))
            {
                Items.Add(new BasketItem { Product = product, Quantity = quantity });
            }

            var existingItem = Items.FirstOrDefault(i => i.ProductId == product.Id);
            if (existingItem != null)
            {
                existingItem.Quantity += quantity;
            }
        }

        public void RemoveItem(int productId, int quantity)
        {
            var existingItem = Items.FirstOrDefault(x => x.ProductId == productId);
            if (existingItem == null)
            {
                return;
            }

            existingItem.Quantity -= quantity;
            if (existingItem.Quantity <= 0)
            {
                Items.Remove(existingItem);
            }
        }

    }
}