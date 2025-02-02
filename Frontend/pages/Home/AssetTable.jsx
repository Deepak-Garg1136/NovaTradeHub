import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";

function AssetTable({ coin, category }) {
  const navigate = useNavigate();

  return (
    <Table className="table-auto w-full border-b">
      <TableHeader>
        <TableRow className="border-b border-t border-gray-800">
          <TableHead className="w-[120px] text-center px-4 py-4 font-bold text-sm">
            COIN
          </TableHead>
          <TableHead className="text-center px-4 py-4 font-bold text-sm">
            SYMBOL
          </TableHead>
          <TableHead className="text-center px-4 py-4 font-bold text-sm">
            VOLUME
          </TableHead>
          <TableHead className="text-center px-4 py-4 font-bold text-sm">
            MARKET CAP
          </TableHead>
          <TableHead className="text-center px-4 py-4 font-bold text-sm">
            24H
          </TableHead>
          <TableHead className="text-center px-4 py-4 font-bold text-sm">
            PRICE
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {coin.map((item, index) => (
          <TableRow
            key={item.id}
            className="border-b border-gray-800 cursor-pointer"
            onClick={() => navigate(`/market/${item.id}`)}
          >
            <TableCell className="font-medium flex items-center gap-2 px-4 py-[0.45rem]">
              <Avatar className="-z-50">
                <AvatarImage src={item.image} />
              </Avatar>
              <span className="text-xs">{item.name}</span>
            </TableCell>
            <TableCell className="text-center px-4 py-[0.45rem] text-xs">
              {item.symbol.toUpperCase()}
            </TableCell>
            <TableCell className="text-center px-4 py-[0.45rem] text-xs">
              {item.total_volume}
            </TableCell>
            <TableCell className="text-center px-4 py-[0.45rem] text-xs">
              {item.market_cap}
            </TableCell>
            <TableCell className="text-center px-4 py-[0.45rem] text-xs">
              {item.price_change_percentage_24h}
            </TableCell>
            <TableCell className="text-center px-4 py-[0.45rem] text-xs">
              ${item.current_price}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default AssetTable;
