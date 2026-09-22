import { CheckoutProvider } from '@/context/CheckoutContext';
import CheckoutSteps from '@/components/CheckoutSteps';

export default function CheckoutLayout({ children }) {
  return (
    <CheckoutProvider>
      <div className="container-x py-10 md:py-14">
        <CheckoutSteps />
        {children}
      </div>
    </CheckoutProvider>
  );
}
