using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.DTOs.Basket;
using API.DTOs.Restaurant;
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
                ClientSecret = basket.ClientSecret ?? "",
                PaymentIntentId = basket.PaymentIntentId ?? "",
                Seats = basket.Seats,
                ReservedDate = basket.ReservedDate.ToShortDateString(),
                ReservedTime = basket.ReservedTime.ToString(@"hh\:mm"),
                Items = basket.Items.Select(item => new BasketItemDTO {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Type = item.Product.Type,
                    Title = item.Product.Title,
                    Description = item.Product.Description,
                    Price = item.Product.Price,
                    ImageUrl = item.Product.ImageUrl,
                }).ToList(),
                Restaurant = new RestaurantCardDTO() 
                { 
                    Id = basket.Restaurant.Id,
                    Name = basket.Restaurant.Name,
                    Address = basket.Restaurant.Address,
                    PictureUrl = basket.Restaurant.PictureUrl,
                    Description = basket.Restaurant.Description
                }
            };
        }
    }
}