import { useSelector } from "react-redux";
import moment from "moment";

export default function PaymentMethod() {
  const nextPayment = useSelector((state) =>
    Object.assign({}, state.billing.payment)
  );
  const subscription = useSelector(
    (state) => state.SettingSubscriptionReducer.subscription
  );
  const selectedPlan = useSelector(
    (state) => state.SettingSubscriptionReducer.monthlyPlans
  ).find((plan) => plan.stripe_id === subscription?.stripe_plan);

  if (!nextPayment?.created) return null;

  return (
    <>
      <h2 className="text-[24px] black font-italic font-bold">Payment</h2>
      <div class="relative bg-white shadow sm:rounded-lg overflow-hidden">
        <div class="p-6">
          <p class="text-sm font-medium text-gray-500 truncate">
            <span>
              Next Payment on{" "}
              {moment.unix(nextPayment.created).format("MMM DD, YYYY")}
            </span>
          </p>{" "}
          <div>
            <p class="mt-2 text-2xl font-semibold text-gray-900">
              ${selectedPlan?.price}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
