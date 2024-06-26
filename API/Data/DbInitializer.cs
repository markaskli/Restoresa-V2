using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void InitializeRestaurantList(StoreContext context)
        {
            if (context.Restaurants.Any()) return;

            var workingHours1 = new List<WorkingHours>(){
                new WorkingHours {
                    Weekday = DayOfWeek.Monday,
                    StartTime = TimeSpan.Parse("09:00"),
                    FinishTime = TimeSpan.Parse("17:00"),
                    TimeSlots = new List<TimeSlot>()
                    {
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("09:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("11:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("13:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("15:00"),
                        },
                    },
                    RestaurantId = 1
                    
                },
                new WorkingHours {
                    Weekday = DayOfWeek.Tuesday,
                    StartTime = TimeSpan.Parse("09:00"),
                    FinishTime = TimeSpan.Parse("17:00"),
                    TimeSlots = new List<TimeSlot>()
                    {
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("09:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("10:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("12:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("13:00"),
                        },
                    },
                    RestaurantId = 1
                },
                new WorkingHours {
                    Weekday = DayOfWeek.Wednesday,
                    StartTime = TimeSpan.Parse("09:00"),
                    FinishTime = TimeSpan.Parse("17:00"),
                    TimeSlots = new List<TimeSlot>()
                    {
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("10:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("12:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("15:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("16:00"),
                        },

                    },
                    RestaurantId = 1
                },
                new WorkingHours {
                    Weekday = DayOfWeek.Thursday,
                    StartTime = TimeSpan.Parse("09:00"),
                    FinishTime = TimeSpan.Parse("17:00"),
                    TimeSlots = new List<TimeSlot>()
                    {
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("09:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("09:30"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("12:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("12:30"),
                        },

                    },
                    RestaurantId = 1
                },
                new WorkingHours {
                    Weekday = DayOfWeek.Friday,
                    StartTime = TimeSpan.Parse("09:00"),
                    FinishTime = TimeSpan.Parse("19:00"),
                    TimeSlots = new List<TimeSlot>()
                    {
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("09:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("10:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("11:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("14:00"),
                        },

                    },
                    RestaurantId = 1
                },    
                new WorkingHours {
                    Weekday = DayOfWeek.Saturday,
                    StartTime = TimeSpan.Parse("10:00"),
                    FinishTime = TimeSpan.Parse("16:00"),
                    TimeSlots = new List<TimeSlot>()
                    {
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("12:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("13:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("14:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("16:00"),
                        },

                    },
                    RestaurantId = 1
                }          
            };

            var workingHours2 = new List<WorkingHours>(){
                new WorkingHours {
                    Weekday = DayOfWeek.Monday,
                    StartTime = TimeSpan.Parse("09:00"),
                    FinishTime = TimeSpan.Parse("17:00"),
                    TimeSlots = new List<TimeSlot>()
                    {
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("09:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("11:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("13:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("15:00"),
                        },
                    },
                    RestaurantId = 2

                },
                new WorkingHours {
                    Weekday = DayOfWeek.Tuesday,
                    StartTime = TimeSpan.Parse("09:00"),
                    FinishTime = TimeSpan.Parse("17:00"),
                    TimeSlots = new List<TimeSlot>()
                    {
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("09:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("10:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("12:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("13:00"),
                        },
                    },
                    RestaurantId = 2
                },
                new WorkingHours {
                    Weekday = DayOfWeek.Wednesday,
                    StartTime = TimeSpan.Parse("09:00"),
                    FinishTime = TimeSpan.Parse("17:00"),
                    TimeSlots = new List<TimeSlot>()
                    {
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("10:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("12:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("15:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("16:00"),
                        },

                    },
                    RestaurantId = 2
                },
                new WorkingHours {
                    Weekday = DayOfWeek.Thursday,
                    StartTime = TimeSpan.Parse("09:00"),
                    FinishTime = TimeSpan.Parse("17:00"),
                    TimeSlots = new List<TimeSlot>()
                    {
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("09:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("09:30"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("12:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("12:30"),
                        },

                    },
                    RestaurantId = 2
                },
                new WorkingHours {
                    Weekday = DayOfWeek.Friday,
                    StartTime = TimeSpan.Parse("09:00"),
                    FinishTime = TimeSpan.Parse("19:00"),
                    TimeSlots = new List<TimeSlot>()
                    {
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("09:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("10:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("11:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("14:00"),
                        },

                    },
                    RestaurantId = 2
                },
                new WorkingHours {
                    Weekday = DayOfWeek.Saturday,
                    StartTime = TimeSpan.Parse("10:00"),
                    FinishTime = TimeSpan.Parse("16:00"),
                    TimeSlots = new List<TimeSlot>()
                    {
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("12:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("13:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("14:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("16:00"),
                        },

                    },
                    RestaurantId = 2
                }
            };

            var workingHours3 = new List<WorkingHours>(){
                new WorkingHours {
                    Weekday = DayOfWeek.Monday,
                    StartTime = TimeSpan.Parse("09:00"),
                    FinishTime = TimeSpan.Parse("17:00"),
                    TimeSlots = new List<TimeSlot>()
                    {
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("09:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("11:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("13:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("15:00"),
                        },
                    },
                    RestaurantId = 3

                },
                new WorkingHours {
                    Weekday = DayOfWeek.Tuesday,
                    StartTime = TimeSpan.Parse("09:00"),
                    FinishTime = TimeSpan.Parse("17:00"),
                    TimeSlots = new List<TimeSlot>()
                    {
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("09:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("10:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("12:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("13:00"),
                        },
                    },
                    RestaurantId = 3
                },
                new WorkingHours {
                    Weekday = DayOfWeek.Wednesday,
                    StartTime = TimeSpan.Parse("09:00"),
                    FinishTime = TimeSpan.Parse("17:00"),
                    TimeSlots = new List<TimeSlot>()
                    {
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("10:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("12:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("15:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("16:00"),
                        },

                    },
                    RestaurantId = 3
                },
                new WorkingHours {
                    Weekday = DayOfWeek.Thursday,
                    StartTime = TimeSpan.Parse("09:00"),
                    FinishTime = TimeSpan.Parse("17:00"),
                    TimeSlots = new List<TimeSlot>()
                    {
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("09:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("09:30"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("12:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("12:30"),
                        },

                    },
                    RestaurantId = 3
                },
                new WorkingHours {
                    Weekday = DayOfWeek.Friday,
                    StartTime = TimeSpan.Parse("09:00"),
                    FinishTime = TimeSpan.Parse("19:00"),
                    TimeSlots = new List<TimeSlot>()
                    {
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("09:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("10:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("11:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("14:00"),
                        },

                    },
                    RestaurantId = 3
                },
                new WorkingHours {
                    Weekday = DayOfWeek.Saturday,
                    StartTime = TimeSpan.Parse("10:00"),
                    FinishTime = TimeSpan.Parse("16:00"),
                    TimeSlots = new List<TimeSlot>()
                    {
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("12:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("13:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("14:00"),
                        },
                        new TimeSlot()
                        {
                            StartTime = TimeSpan.Parse("16:00"),
                        },

                    },
                    RestaurantId = 3
                }
            };

            var restaurants = new List<Restaurant> {
                new Restaurant {
                    Id = 1,
                    Name = "Grill London (Mega)",
                    Address = "Islandijos pl. 32, Kaunas",
                    Description = "Skanu gardu",
                    PictureUrl = "https://images.bolt.eu/store/2022/2022-10-24/bac90258-1317-4bd0-8f3b-4167de1f40d4.jpeg",
                    MaxPeopleServedPerTable = 5,
                    WorkingHours = new List<WorkingHours>(workingHours1),
                    OwnerId = "08f046ba-8a17-4687-8b69-1b58e4042836"


                },
                new Restaurant {
                    Id = 2,
                    Name = "Mad Brothers",
                    Address = "Vilniaus gatvė 28, Kaunas",
                    Description = "Skanu gardu",
                    PictureUrl = "https://imageproxy.wolt.com/venue/5c88f9e985b894000b4f1b1a/30bc1e1c-ada6-11ec-9297-cae5d1dc558e_7.baking_mad_list_1.jpg",
                    MaxPeopleServedPerTable = 3,
                    WorkingHours = new List<WorkingHours>(workingHours2),
                    OwnerId = "08f046ba-8a17-4687-8b69-1b58e4042836"

                },
                new Restaurant {
                    Id = 3,
                    Name = "PJazz (Vilniaus g.)",
                    Address = "Islandijos pl. 32, Kaunas",
                    Description = "Skanu gardu",
                    PictureUrl = "https://imageproxy.wolt.com/venue/5a8292e92e3b00000b6f5a07/23c991a6-54b8-11ea-b860-0a5864790c11_nuotr.Egles_Gendrenaites_www.egphoto.lt_2020_02-1.jpg",
                    MaxPeopleServedPerTable = 2,
                    WorkingHours = new List<WorkingHours>(workingHours3),
                    OwnerId = "8a5283cc-5fae-442a-97fc-9d2020488197"
                }
            };

            var products = new List<Product> {
                new Product {
                    Type = "Desertai",
                    Title = "Tradicinis angliškas Banoffee pyragas su miško uogų padažu",
                    Description = "",
                    Price = 380,
                    RestaurantId = 1,
                    ImageUrl = "https://images.bolt.eu/store/2022/2022-10-26/ba84abad-1d37-4b9b-b497-eeec9183aff5.jpeg",
                },
                new Product {
                    Type = "Mėsos patiekalai",
                    Title = "Chick mania",
                    Description = "Sultinga ant grotelių kepta vištiena, čederio sūris, Iceberg salatos, pomidoras, karamelizuotas svogūnas, specialus MAD padažas ir teriyaki padažas, supakuotas į brioche bandelę",
                    Price = 715,
                    RestaurantId = 2,
                    ImageUrl = "https://imageproxy.wolt.com/menu/menu-images/612f4d7b49e5b35aec3fa5ca/f71091b8-6c20-11ed-af50-ba35f7967896_chicken.jpeg?w=600",

                },
                new Product {
                    Type = "Kesadilija",
                    Title = "Veg quesadilla",
                    Description = "Quesadilla with Mozzarella cheese, Crispy onion, green and red capsicum, sweet corn, cherry tomato, black olive and green olive",
                    Price = 645,
                    RestaurantId = 2,
                    ImageUrl = "https://imageproxy.wolt.com/menu/menu-images/612f4d7b49e5b35aec3fa5ca/8f8d323e-64f6-11ed-be55-ceef3f1b7bfc_masala_city_product_1.jpeg?w=600",
                },
                new Product {
                    Type = "Picos su mėsa",
                    Title = "Vezuvijaus 30 cm",
                    Description = "Kumpis, mocarela, pomidorų padažas",
                    Price = 925,
                    RestaurantId = 3,
                    ImageUrl = "https://imageproxy.wolt.com/menu/menu-images/5a6a2fdcffb8e0000b4ef296/9abed070-c760-11eb-9edd-56ac1ff6c073_nuotr.egles_gendrenaites_pica_4.jpeg?w=600",
                },
                new Product {
                    Type = "Žuvies patiekalai",
                    Title = "Ant griliaus kepta tuno filė su imbieriniu padažu",
                    Description = "Patiekiama su keptais pomidorais ir bulvių kroketais",
                    Price = 1575,
                    RestaurantId = 3,
                    ImageUrl = "https://imageproxy.wolt.com/menu/menu-images/5a6a2fdcffb8e0000b4ef296/a4d7d790-c53b-11eb-ba15-0abffd317887_nuotr.egles_gendrenaites_maistas_2021_104.jpeg?w=600",
                },
                new Product {
                    Type = "Picos su mėsa",
                    Title = "Polina 30 cm",
                    Description = "Vištienos krūtinėlė, mocarela, pievagrybiai, paprikos, pomidorų padažas, kario padažas",
                    Price = 950,
                    RestaurantId = 3,
                    ImageUrl = "https://imageproxy.wolt.com/menu/menu-images/5a6a2fdcffb8e0000b4ef296/a4235f14-c760-11eb-b34f-16ab5a3a7b84_nuotr.egles_gendrenaites_pica_28.jpeg?w=600"
                },
                new Product {
                    Type = "Picos su mėsa",
                    Title = "Capricciosa 30 cm",
                    Description = "Kumpis, mocarela, pievagrybiai, pomidorų padažas",
                    Price = 950,
                    RestaurantId = 3,
                    ImageUrl = "https://imageproxy.wolt.com/menu/menu-images/5a6a2fdcffb8e0000b4ef296/ad8d5e88-c760-11eb-9fcc-9e368d64b6e1_nuotr.egles_gendrenaites_pica_12.jpeg?w=600"
                },
                new Product {
                    Type = "Picos su mėsa",
                    Title = "Azteca. Aštri 30 cm",
                    Description = "Kumpis, mocarela, salsa, grietinė su uoginėmis paprikomis, pomidorų padažas",
                    Price = 990,
                    RestaurantId = 3,
                    ImageUrl = "https://imageproxy.wolt.com/menu/menu-images/5a6a2fdcffb8e0000b4ef296/b63cf836-c760-11eb-8f5a-0ec8189aee90_azteka.jpeg?w=600"
                },
                new Product {
                    Type = "Picos su mėsa",
                    Title = "Sazia 30 cm",
                    Description = "Vištienos krūtinėlė, kepta kiauliena, bekoniena, mocarela, pomidorai, pomidorų padažas, svogūnai, kepsnių padažas",
                    Price = 1200,
                    RestaurantId = 3,
                    ImageUrl = "https://imageproxy.wolt.com/menu/menu-images/5a6a2fdcffb8e0000b4ef296/50941da6-ce78-11eb-aad8-0abfaceaf0f8_nuotr.egles_gendrenaites_pica_7.jpeg?w=600"
                },
                new Product {
                    Type = "Picos su mėsa",
                    Title = "Rossa. Aštri 30 cm",
                    Description = "Kepta kiauliena, bekoniena, mocarela, pomidorai, kepti česnakai, pomidorų padažas, salsa, uoginės paprikos, aitriosios paprikos",
                    Price = 110,
                    RestaurantId = 1,
                    ImageUrl = "https://imageproxy.wolt.com/menu/menu-images/5a6a2fdcffb8e0000b4ef296/193e7ebe-c761-11eb-a728-c2df4942543a_nuotr.egles_gendrenaites_pica_38.jpeg?w=600"
                },
                new Product {
                    Type = "Picos su mėsa",
                    Title = "Cappero 30 cm",
                    Description = "Vytintas serrano kumpis, vyšninė mocarela, mocarela, pomidorai, parmezanas, pomidorų padažas, pesto padažas, kaparėliai, rukola",
                    Price = 1090,
                    RestaurantId = 3,
                    ImageUrl = "https://imageproxy.wolt.com/menu/menu-images/5a6a2fdcffb8e0000b4ef296/59167d70-c761-11eb-873e-f23850b9fac8_nuotr.egles_gendrenaites_pica_43.jpeg?w=600"
                },
                new Product {
                    Type = "Picos su žuvimi",
                    Title = "Marinara 30 cm",
                    Description = "Krevetės, lašišų file, mocarela, rikotos kremas su špinatais, pomidorų padažas",
                    Price = 1399,
                    RestaurantId = 3,
                    ImageUrl = "https://imageproxy.wolt.com/menu/menu-images/5a6a2fdcffb8e0000b4ef296/eb0b5e9e-c761-11eb-a089-f23850b9fac8_nuotr.egles_gendrenaites_pica_65.jpeg?w=600"
                },
                new Product {
                    Type = "Vegetariškos picos",
                    Title = "Margarita 30 cm",
                    Description = "Mocarela, pomidorų padažas",
                    Price = 750,
                    RestaurantId = 3,
                    ImageUrl = "https://imageproxy.wolt.com/menu/menu-images/5a6a2fdcffb8e0000b4ef296/5ce1bf10-c760-11eb-81bc-ea23691dd81a_nuotr.egles_gendrenaites_pica_2.jpeg?w=600"
                },
                new Product {
                    Type = "Vegetariškos picos",
                    Title = "Ricotta formaggio 30 cm",
                    Description = "Mocarela, varškės sūris, ožkos sūris, parmezanas, pomidorai, pomidorų padažas, rikotos kremas su špinatais",
                    Price = 1150,
                    RestaurantId = 3,
                    ImageUrl = "https://imageproxy.wolt.com/menu/menu-images/5a6a2fdcffb8e0000b4ef296/84dc73f2-c760-11eb-bffd-2a36d515bd46_nuotr.egles_gendrenaites_pica_49.jpeg?w=600"
                },
                new Product {
                    Type = "Desertai",
                    Title = "Naminis obuolių pyragas",
                    Description = "Su vaniliniais ledais",
                    Price = 590,
                    RestaurantId = 3,
                    ImageUrl = "https://imageproxy.wolt.com/menu/menu-images/5a6a2fdcffb8e0000b4ef296/1a9be232-c53c-11eb-9d7f-de7766aa1b7e_nuotr.egles_gendrenaites_maistas_2021_31.jpeg?w=600"
                },
                new Product {
                    Type = "Desertai",
                    Title = "Varškės štrudelis",
                    Description = "Su vanilės užpilu",
                    Price = 650,
                    RestaurantId = 1,
                    ImageUrl = "https://www.lrt.lt/img/2019/06/17/451377-808532-1287x836.jpg"
                },
                new Product {
                    Type = "Desertai",
                    Title = "Šokoladinis suflė",
                    Description = "Šokoladinis suflė",
                    Price = 600,
                    RestaurantId = 3,
                    ImageUrl = "https://imageproxy.wolt.com/menu/menu-images/5a6a2fdcffb8e0000b4ef296/eda0e3e4-c794-11eb-bb66-268b8b2075bc_www.egphoto.lt_2020_10.jpeg?w=600"
                },
                new Product {
                    Type = "Buritos",
                    Title = "Grill Magic",
                    Description = "Meksikietiški ryžiai ant pagrindo su Iceberg, kopūstų salotomis, saldžiaisiais kukurūzais, pupelėmis, kepta teriyaki vištiena, pagardinta specialiu MAD padažu",
                    Price = 775,
                    RestaurantId = 2,
                    ImageUrl = "https://imageproxy.wolt.com/menu/menu-images/612f4d7b49e5b35aec3fa5ca/1a17df80-64f7-11ed-b60e-def61e2758d5_masala_city_product_6.jpeg?w=600"
                },
                new Product {
                    Type = "Buritos",
                    Title = "Pork Bite",
                    Description = "Pulled kiauliena, meksikietiški ryžiai, pupelės, iceberg, kopūstų salotos ir padažas",
                    Price = 799,
                    RestaurantId = 2,
                    ImageUrl = "https://imageproxy.wolt.com/menu/menu-images/612f4d7b49e5b35aec3fa5ca/664926f2-64f7-11ed-b49b-f2aa86aa6900_masala_city_product_4.jpeg?w=600"
                },
                new Product {
                    Type = "Burgeriai",
                    Title = "Tradicinis angliškas Banoffee pyragas su miško uogų padažu",
                    Description = "",
                    Price = 380,
                    RestaurantId = 2,
                    ImageUrl = "https://images.bolt.eu/store/2022/2022-10-26/ba84abad-1d37-4b9b-b497-eeec9183aff5.jpeg"
                },
                new Product {
                    Type = "Burgeriai",
                    Title = "„Bloodbath“ aštrus mėsainis su bulvytėmis ir padažu",
                    Description = "Brioche bandelė, rūkytos jautienos smulkus, pomidoras, traškus svogūnas, įdaryti dūminio sūrio, sultenai, šoninė, aštrus Mayo, jalapeno",
                    Price = 849,
                    RestaurantId = 2,
                    ImageUrl = "https://imageproxy.wolt.com/menu/menu-images/612f4d7b49e5b35aec3fa5ca/5214bdfc-6c1f-11ed-a32b-9a5c931e5ddd_masala_city_product_2.jpeg?w=600"
                },
                new Product {
                    Type = "Gėrimai",
                    Title = "Cola Zero 0,3 l",
                    Description = "",
                    Price = 180,
                    RestaurantId = 2,
                    ImageUrl = "https://images.bolt.eu/store/2022/2022-10-26/ba84abad-1d37-4b9b-b497-eeec9183aff5.jpeg"
                },
                new Product {
                    Type = "Gėrimai",
                    Title = "Fanta 0,3 l",
                    Description = "",
                    Price = 180,
                    RestaurantId = 2,
                    ImageUrl = "https://imageproxy.wolt.com/menu/menu-images/612f4d7b49e5b35aec3fa5ca/6bfc5588-4077-11ec-97f9-e2040cab288a_fanta_0_33_l.jpeg?w=600"
                },
                new Product {
                    Type = "Sriubos",
                    Title = "Burokėlių sriuba",
                    Description = "",
                    Price = 230,
                    RestaurantId = 1,
                    ImageUrl = "https://images.bolt.eu/store/2022/2022-10-31/d03c2f3f-a043-4eaf-ad3c-3ae92bbfd096.png"
                },
                new Product {
                    Type = "Sriubos",
                    Title = "Ant žarijų keptos jautienos ir daržovių sriuba",
                    Description = "",
                    Price = 460,
                    RestaurantId = 1,
                    ImageUrl = "https://images.bolt.eu/store/2022/2022-10-26/1ae72111-4bf3-4a4b-a507-cd1508f5b523.jpeg"
                },
                new Product {
                    Type = "Užkandžiai",
                    Title = "Gruzdintos bulvytės",
                    Description = "Pasirinktinai (skiltelės, laiveliai, šiaudeliai, kroketai) su padažu",
                    Price = 250,
                    RestaurantId = 1,
                    ImageUrl = "https://images.bolt.eu/store/2022/2022-10-26/8a5fc312-cbe4-4f15-9836-e2981e66af89.jpeg"
                },
                new Product {
                    Type = "Užkandžiai",
                    Title = "Vištienos sparneliai",
                    Description = "Su morkų šiaudeliais ir Tzatziki padažu. Glazūra pasirinktinai: BBQ, Jameson",
                    Price = 450,
                    RestaurantId = 1,
                    ImageUrl = "https://images.bolt.eu/store/2022/2022-10-26/bab5f452-d0dd-4fa3-9599-0d81801ba0e5.jpeg"
                },
                new Product {
                    Type = "Grill koldūnų iešmelis",
                    Title = "Grill koldūnų iešmelis su vištiena, sūriu ir grybais",
                    Description = "",
                    Price = 490,
                    RestaurantId = 1,
                    ImageUrl = "https://images.bolt.eu/store/2022/2022-10-26/72699ff0-bedf-41aa-99d8-263ce184e3ac.jpeg"
                },
                new Product {
                    Type = "Grill koldūnų iešmelis",
                    Title = "Grill koldūnų iešmelis su daržovėmis",
                    Description = "",
                    Price = 390,
                    RestaurantId = 1,
                    ImageUrl = "https://images.bolt.eu/store/2022/2022-10-26/a593df3a-4731-41e0-ae64-235096993e09.jpeg"
                },
                new Product {
                    Type = "Salotos",
                    Title = "Keptų daržovių salotos su teriyaki vištienos iešmeliu",
                    Description = "",
                    Price = 590,
                    RestaurantId = 1,
                    ImageUrl = "https://images.bolt.eu/store/2023/2023-01-09/f8fe7583-48a3-46fa-8aec-2b287abf70c6.jpeg"
                },
                new Product {
                    Type = "Salotos",
                    Title = "Cezario salotos su daržovių iešmeliu",
                    Description = "",
                    Price = 480,
                    RestaurantId = 1,
                    ImageUrl = "https://images.bolt.eu/store/2022/2022-12-08/63c5de95-81b5-4658-996c-4547441bae26.jpeg"
                },
                new Product {
                    Type = "Kepsniai",
                    Title = "Augalinės Kilmės Beyond Meat maltinukas su Teriyaki",
                    Description = "",
                    Price = 890,
                    RestaurantId = 1,
                    ImageUrl = "https://images.bolt.eu/store/2022/2022-10-26/5c7ee52a-6b3e-4fb7-9d43-5363fe969e35.jpeg"
                },
                new Product {
                    Type = "Kepsniai",
                    Title = "Jameson kiaulienos šonkauliai",
                    Description = "",
                    Price = 1380,
                    RestaurantId = 1,
                    ImageUrl = "https://images.bolt.eu/store/2022/2022-10-26/fea2556a-6be6-4b57-bf5f-956a5cec364f.jpeg"
                },
                new Product {
                    Type = "Burgeriai",
                    Title = "BBQ plėšytos kiaulienos burgeris",
                    Description = "",
                    Price = 480,
                    RestaurantId = 1,
                    ImageUrl = "https://images.bolt.eu/store/2023/2023-03-06/a24ad76a-2059-4cc4-bdaa-96418485018d.jpeg"
                },
                new Product {
                    Type = "Burgeriai",
                    Title = "Šamo filė burgeris",
                    Description = "",
                    Price = 680,
                    RestaurantId = 1,
                    ImageUrl = "https://images.bolt.eu/store/2023/2023-03-06/dbbcaeb2-3ec0-458a-a5e7-488b82f896d9.jpeg"
                },
                new Product {
                    Type = "Burgeriai",
                    Title = "Kepto ožkų sūrio burgeris",
                    Description = "",
                    Price = 680,
                    RestaurantId = 1,
                    ImageUrl = "https://images.bolt.eu/store/2023/2023-03-06/164ae78c-afce-403c-a7e1-0ad7b7fbb2dd.jpeg"
                },
                new Product {
                    Type = "Desertai",
                    Title = "Šokoladinis Brownie pyragas su plakta grietinėle ir vyšniomis",
                    Description = "",
                    Price = 380,
                    RestaurantId = 1,
                    ImageUrl = "https://images.bolt.eu/store/2022/2022-10-26/bbb7da21-a88f-4374-a7a7-4c5d9374c4e5.jpeg"
                },
                new Product {
                    Type = "Gerimai",
                    Title = "Mineralinis vanduo Vichy 0,33 l",
                    Description = "",
                    Price = 200,
                    RestaurantId = 1,
                    ImageUrl = "https://cancan.lt/upload/products_pictures/negazuotas.jpg"
                }
            };

            
            foreach(Restaurant restaurant in restaurants) 
            {            
                foreach(Product product in products) 
                {
                    if (product.RestaurantId == restaurant.Id)
                    {
                        restaurant.Products.Add(product);
                    }
                }
                context.Restaurants.Add(restaurant);
            }   
               
            context.SaveChanges();
        }

        public static async void InitializeUsers(UserManager<User> userManager, IConfiguration configuration)
        {
            if (userManager.Users.Any())
            {
                return;
            }

            var client = new User()
            {
                Id = "734191bb-4559-48d8-bbd1-140c0a68c095",
                UserName = "client",
                Name = "John",
                Surname = "Doe",
                Email = "john@gmail.com",
                PhoneNumber = "37062222222",
            };

            var employee1 = new User()
            {
                Id = "08f046ba-8a17-4687-8b69-1b58e4042836",
                UserName = "employee1",
                Name = "Jonathan",
                Surname = "Smithz",
                Email = "smithz@gmail.com",
                PhoneNumber = "37063333333",
            };

            var employee2 = new User()
            {
                Id = "8a5283cc-5fae-442a-97fc-9d2020488197",
                UserName = "employee2",
                Name = "Nick",
                Surname = "Kitz",
                Email = "kitz@gmail.com",
                PhoneNumber = "37064444444",
            };

            var admin = new User()
            {
                Id = "a18be9c0-aa65-4af8-bd17-00bd9344e575",
                Name = "Admin",
                Surname = string.Empty,
                UserName = "admin",
                Email = "admin@gmail.com",
                EmailConfirmed = true,
            };

            await userManager.CreateAsync(admin, configuration["Admin:Password"]);
            await userManager.CreateAsync(client, configuration["User:Password"]);
            await userManager.CreateAsync(employee1, configuration["Employee:Password"]);
            await userManager.CreateAsync(employee2, configuration["Employee:Password"]);
            await userManager.AddToRoleAsync(client, "Customer");
            await userManager.AddToRoleAsync(employee1, "Restaurant-Employee");
            await userManager.AddToRoleAsync(employee2, "Restaurant-Employee");
            await userManager.AddToRoleAsync(admin, "Admin");


        }

    }
}