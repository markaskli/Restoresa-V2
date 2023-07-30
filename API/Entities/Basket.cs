using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();
        public string ClientSecret { get; set; }

        public Restaurant Restaurant { get; set; }
        public int RestaurantId { get; set; }


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