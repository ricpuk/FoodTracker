using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace FoodTracker.Application.Common.Models
{
    public class PaginatedList<T> 
    {
        public List<T> Items { get; }
        public int PageIndex { get; }
        public int TotalPages { get; }
        public int TotalCount { get; }

        public PaginatedList(List<T> items, int count, int pageIndex, int pageSize)
        {
            PageIndex = pageIndex;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            TotalCount = count;
            Items = items;
        }

        public PaginatedList(T item)
        {
            Items = new List<T> {item};
            PageIndex = 1;
            TotalCount = 1;
            TotalPages = 1;
        }

        public PaginatedList()
        {
            Items = new List<T>();
            PageIndex = 0;
            TotalCount = 0;
            TotalPages = 0;
        }

        public bool HasPreviousPage => PageIndex > 1;

        public bool HasNextPage => PageIndex < TotalPages;

        public static async Task<PaginatedList<T>> CreateAsync(IQueryable<T> source, int pageIndex, int pageSize)
        {
            var count = await source.CountAsync();
            if (count == 0)
            {
                return new PaginatedList<T>(new List<T>(), count, pageIndex, pageSize);
            }
            var items = await source.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();

            return new PaginatedList<T>(items, count, pageIndex, pageSize);
        }
    }
}
