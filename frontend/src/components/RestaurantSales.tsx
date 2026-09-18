import { useEffect, useState } from "react";
import axios from "axios";
import { restaurantService } from "../main";

interface RestaurantSalesProps {
  restaurantId: string;
}

interface TopItem {
  itemId: string;
  name: string;
  quantity: number;
  revenue: number;
}

interface SalesData {
  summary: {
    totalSales: number;
    totalSubtotal: number;
    totalOrders: number;
    totalItemsSold: number;
  };
  topItems: TopItem[];
}

const RestaurantSales = ({ restaurantId }: RestaurantSalesProps) => {
  const [sales, setSales] = useState<SalesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSales = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await axios.get(
        `${restaurantService}/api/order/restaurant/${restaurantId}/sales`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSales(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load sales data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (restaurantId) {
      fetchSales();
    }
  }, [restaurantId]);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-500">Loading sales...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!sales) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-500">No sales data available.</p>
      </div>
    );
  }

  const { summary, topItems } = sales;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Sales Overview
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Sales from delivered and paid orders
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Food Sales */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Food Sales</p>

          <h3 className="mt-2 text-2xl font-bold text-gray-800">
            ₹{summary.totalSubtotal.toFixed(2)}
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            Total value of food sold
          </p>
        </div>

        {/* Restaurant Earnings */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Restaurant Earnings
          </p>

          <h3 className="mt-2 text-2xl font-bold text-red-500">
            ₹{summary.totalSales.toFixed(2)}
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            70% of food sales
          </p>
        </div>

        {/* Completed Orders */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Completed Orders
          </p>

          <h3 className="mt-2 text-2xl font-bold text-gray-800">
            {summary.totalOrders}
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            Delivered and paid
          </p>
        </div>

        {/* Items Sold */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Items Sold
          </p>

          <h3 className="mt-2 text-2xl font-bold text-gray-800">
            {summary.totalItemsSold}
          </h3>

          <p className="mt-1 text-xs text-gray-400">
            Across completed orders
          </p>
        </div>
      </div>

      {/* Earnings Breakdown */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800">
          Earnings Breakdown
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Your earnings are calculated as 70% of food sales.
        </p>

        <div className="mt-6 space-y-4">
          {/* Food Sales */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Food Sales
            </span>

            <span className="font-semibold text-gray-800">
              ₹{summary.totalSubtotal.toFixed(2)}
            </span>
          </div>

          {/* Restaurant Share */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Restaurant Share
            </span>

            <span className="font-semibold text-gray-800">
              70%
            </span>
          </div>

          {/* Progress */}
          <div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-red-500"
                style={{ width: "70%" }}
              />
            </div>
          </div>

          {/* Earnings */}
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700">
                Restaurant Earnings
              </span>

              <span className="text-xl font-bold text-red-500">
                ₹{summary.totalSales.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Selling Items */}
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Top Selling Items
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Food items sold in completed orders
          </p>
        </div>

        {topItems.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <p className="text-gray-500">
              No items sold yet.
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {topItems.map((item, index) => {
              const foodSales = item.revenue / 0.7;

              return (
                <div
                  key={item.itemId}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
                      {index + 1}
                    </div>

                    <div>
                      <p className="font-medium text-gray-800">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {item.quantity}{" "}
                        {item.quantity === 1 ? "item" : "items"} sold
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      ₹{foodSales.toFixed(2)}
                    </p>

                    <p className="text-xs text-gray-400">
                      Food sales
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Refresh */}
      <div className="flex justify-end">
        <button
          onClick={fetchSales}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Refresh Sales
        </button>
      </div>
    </div>
  );
};

export default RestaurantSales;