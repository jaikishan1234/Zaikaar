import { useEffect, useState } from "react";
import axios from "axios";
import { riderService } from "../main";

interface EarningsOrder {
  orderId: string;
  riderAmount: number;
  distance: number;
  createdAt: string;
}

interface EarningsData {
  summary: {
    totalEarnings: number;
    totalDeliveries: number;
    totalDistance: number;
  };
  orders: EarningsOrder[];
}

const RiderEarnings = () => {
  const [earnings, setEarnings] = useState<EarningsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const fetchEarnings = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await axios.get(
        `${riderService}/api/rider/earnings`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setEarnings(data);
    } catch (error) {
      console.error(error);
      setError("Failed to load earnings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEarnings();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-md px-4">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Loading earnings...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md px-4">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!earnings) {
    return null;
  }

  const { summary, orders } = earnings;

  return (
    <div className="mx-auto max-w-md px-4 pb-6">
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {/* Earnings Header */}
        <div className="border-b px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Earnings
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                From completed deliveries
              </p>
            </div>

            <span className="text-xl">💰</span>
          </div>
        </div>

        {/* Main Earnings */}
        <div className="px-5 py-5">
          <div className="grid grid-cols-2 gap-3">
            {/* Total Earnings */}
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs text-gray-500">
                Total Earnings
              </p>

              <p className="mt-2 text-2xl font-bold text-[#e23744]">
                ₹{summary.totalEarnings.toFixed(2)}
              </p>
            </div>

            {/* Deliveries */}
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="text-xs text-gray-500">
                Deliveries
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-800">
                {summary.totalDeliveries}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Completed
              </p>
            </div>
          </div>

          {/* Distance */}
          <div className="mt-3 flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <div>
              <p className="text-xs text-gray-500">
                Total Distance
              </p>

              <p className="mt-1 text-lg font-semibold text-gray-800">
                {summary.totalDistance.toFixed(2)} km
              </p>
            </div>

            <span className="text-xs text-gray-400">
              Completed deliveries
            </span>
          </div>

          {/* Actions */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setShowHistory((prev) => !prev)}
              className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              {showHistory
                ? "Hide History"
                : "View Delivery History"}
            </button>

            <button
              onClick={fetchEarnings}
              className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Delivery History */}
        {showHistory && (
          <div className="border-t">
            <div className="px-5 py-4">
              <h3 className="font-semibold text-gray-800">
                Delivery History
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Your completed deliveries
              </p>
            </div>

            {orders.length === 0 ? (
              <div className="border-t px-5 py-8 text-center">
                <p className="text-sm text-gray-500">
                  No completed deliveries yet.
                </p>
              </div>
            ) : (
              <div className="border-t">
                {orders.map((order) => (
                  <div
                    key={order.orderId}
                    className="border-b px-5 py-4 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">
                          Order #{order.orderId.slice(-6)}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Distance: {order.distance.toFixed(2)} km
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-[#e23744]">
                          ₹{order.riderAmount.toFixed(2)}
                        </p>

                        <p className="mt-1 text-xs text-green-600">
                          Delivered
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RiderEarnings;