import { PayPalButtons } from "@paypal/react-paypal-js";

const PaypalBtn = (props) => {

    const { amount, currency, createSubscription, onApprove, catchError, onError, onCancel } = props;

    return (
        <PayPalButtons
            amount={amount}
            currency={currency}
            createSubscription={(data, details) => createSubscription(data, details)}
            onApprove={(data, details) => onApprove(data, details)}
            onError={(err) => onError(err)}
            catchError={(err) => catchError(err)}
            onCancel={(err) => onCancel(err)}
        />
    )
}

export default PaypalBtn