using System;
using System.Collections.Generic;

namespace Model;
public interface IDataController<T, O>
{
    public T findById(int id);

    public List<T> getAll();

    public T convertModelToDTO();
}