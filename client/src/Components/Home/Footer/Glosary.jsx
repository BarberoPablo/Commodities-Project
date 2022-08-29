import React from 'react'
import s from './css/TermsPolicy.module.css'
const Glosary = () => {
    return (
        <div className={s.container}>
          <h1>Glosary</h1>
            <ul>
                <li><b>Commodities: </b> A product that is indistinguishable from ones manufactured or provided by competing companies and that therefore sells primarily on the basis of price rather than quality or style.</li>
                <li><b>Categories:</b> The categories into which commodities are divided.</li>
                <li><b>Sub Categories: </b> The sub categories into which categories are divided.</li>
                <li><b>Payment Terms: </b>
                    <ol>
                        <li><b>LC:</b> Letter of Credit. Refers to a legal document that guarantees the buyer's payment to the sellers. If the buyer is unable to make such payment, the bank covers the full of the remaining amount on behalf of the buyer.</li>
                        <li><b>DLC:</b> Domestic Letter of Credit. Refers to a legal documennt where is bank obligation to pay the seller of goods a certain amount of money in the timely submission of documents confirming shipment of good of contractual services.</li>
                        <li><b>SBLC:</b> Standby Letter of Credit. Refers to a legal document where a back guarantees the payment of a specific amount of money to a seller if the buyer defaults on the agreement.</li>
                    </ol>
                </li>
                <li><b>Shipping Terms:</b>
                    <ol>
                        <li><b>CIF:</b> Cost, Insurance and Freight. It means that the seller is responsible for delivery of the goods to a ship, and insuring the shipment until it reaches the port of destination.</li>
                        <li><b>FOB:</b> Free on Board. The seller clears the goods for export and ensures they are delivered to and loaded onto the vessel for transport at the named por of departure.</li>
                    </ol>
                </li>
                <li><b>Membership:</b> The state of being a user with special characteristics. </li>
                <li><b>Seller:</b> A person/company that sells a product.</li>
                <li><b>Buyer:</b> A person/company that buy a product.</li>
                <li><b>Inquiry: </b> Consult of a specific product</li>
            </ul>
        </div>
    )
}

export default Glosary
