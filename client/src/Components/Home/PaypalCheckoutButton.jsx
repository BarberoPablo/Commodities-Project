//Va a tener la logica y el estilo del boton de compra
//La librería viene con botones pre-definidos
import {PayPalButtons} from "@paypal/react-paypal-js";

const PaypalCheckoutButton = (props) =>{
  const { product } = props;

  return (
    
      <PayPalButtons
      style= {
        {
          tagline:"false",
          shape: 'pill',
          color: 'black',
          layout: 'horizontal',
          label: 'subscribe'
        }
      }
      />         
    
  )
}
export default PaypalCheckoutButton;