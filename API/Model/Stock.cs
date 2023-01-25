using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using Microsoft.EntityFrameworkCore;

namespace Model
{
    public class Stock : IValidateDataObject, IDataController<StockDTO, Stock>
    {
        private int id;
        private int total;
        private int currentStock;
        private Product product;

        public int Id { get => id; set => id = value; }

        public int Total { get => total; set => total = value; }
        public int CurrentStock { get => currentStock; set => currentStock = value; }
        public Product Product { get => product; set => product = value; }

        public bool validateObject()
        {
            if (this.total == null)
            {
                return false;
            }
            if (this.currentStock == null)
            {
                return false;
            }
            return true;
        }

        public StockDTO convertModelToDTO()
        {
            var stockDTO = new StockDTO();
            stockDTO.Total = this.Total;
            stockDTO.CurrentStock = this.CurrentStock;
            stockDTO.Product = this.Product.convertModelToDTO();
            return stockDTO;
        }

        public static Stock convertDTOToModel(StockDTO obj)
        {
            Stock stock = new Stock();
            stock.Total = obj.Total;
            stock.CurrentStock = obj.CurrentStock;
            if (obj.Product != null)
            {
                stock.product = Product.convertDTOToModel(obj.Product);
            }
            return stock;
        }

        public static void save(RegisterStock estoque)
        {

            Console.WriteLine(estoque.productid);
            Console.WriteLine(estoque.total);

            using (var context = new Context())
            {
                var stocks = new Stock()
                {
                    Total = estoque.total,
                    CurrentStock = estoque.total,
                    Product = context.product.FirstOrDefault(e => e.Id == estoque.productid)
                };

                context.stock.Add(stocks);

                if (stocks.Product != null)
                {
                    context.Entry(stocks.Product).State = Microsoft.EntityFrameworkCore.EntityState.Unchanged;
                }
                context.SaveChanges();
            }

        }

        public void update(StockDTO stockDTO, int id)
        {
            using (var context = new Context())
            {
                var stock = context.stock.FirstOrDefault(s => s.Product.Id == id);
                if (stock != null)
                {
                    if(stockDTO.CurrentStock != null)
                    {
                        stock.CurrentStock = stockDTO.CurrentStock;
                    }
                }
                context.SaveChanges();
            }
        }

        public static void delete(int id)
        {
            using (var context = new Context())
            {
                var stocks = context.stock.Where(i => i.Id == id);

                foreach (var item in stocks)
                {
                    context.stock.Remove(item);
                }

                context.SaveChanges();
            }
        }

        public static List<object> findAll()
        {
            using (var context = new Context())
            {
                var stock = context.stock.Include(e => e.Product);

                List<object> stocks = new List<object>();

                foreach (var item in stock)
                {
                    stocks.Add(item);
                }

                return stocks;
            }
        }

        public static List<object> FindProductID(int product)
        {
            using (var context = new Context())
            {
                var stock = context.stock.Where(s => s.Product.Id == product).Include(e => e.Product);

                List<object> stocks = new List<object>();

                
                foreach (var item in stock)
                {
                    stocks.Add(item);
                }
                

                return stocks;
            }
        }

        public StockDTO findById(int id)
        {
            return new StockDTO();
        }

        public List<StockDTO> getAll() { return new List<StockDTO>(); }


    }
}
