using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDTO MapBasketToDTO(this Basket basket) 
        {
            return new BasketDTO {
                Id = basket.Id,
                BuyerId = basket.ClientId,
                RestaurantId = basket.RestaurantId,
                Items = basket.Items.Select(item => new BasketItemDTO {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Type = item.Product.Type,
                    Title = item.Product.Title,
                    Description = item.Product.Description,
                    Price = item.Product.Price,
                    ImageUrl = item.Product.ImageUrl,
                }).ToList()
            };
        }
    }
}