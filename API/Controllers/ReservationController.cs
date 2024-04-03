using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.Reservation;
using API.Entities;
using API.Exceptions;
using API.Services.ReservationService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationService _reservationService;

        public ReservationController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ReservationDTO>> Get(int id)
        {
            var reservation = await _reservationService.GetReservationById(id);
            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;

        }

        [HttpGet("user")]
        public async Task<ActionResult> GetReservationsOfUser(string userId)
        {
            var reservations = await _reservationService.GetReservationOfUser(userId);
            if (reservations == null)
            {
                return NotFound();
            }

            return Ok(reservations);
        }


        [HttpPost]
        public async Task<ActionResult<ReservationDTO>> Create(CreateReservationDTO reservationDTO)
        {
            try
            {
                var result = await _reservationService.CreateReservation(reservationDTO);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch (FormatException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (WorkingHoursNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, ex.Message);
            }
        }



    }
}