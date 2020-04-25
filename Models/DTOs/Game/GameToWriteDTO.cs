using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public abstract class GameToWriteDTO<T>
{
    public IList<T> Pawns { get; set; }
}