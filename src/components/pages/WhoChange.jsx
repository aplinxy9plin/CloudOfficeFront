import React from 'react'

import { Popup, Page, List, ListItem, ListButton} from 'framework7-react'

import upload_icon from '../../assets/img/file.png'
import '../../styles/bundle.scss';


function a(props){
    return <Popup className="demo-popup" opened={props.open}>
      <Page>
        <List
        >
            <ListItem>Alex Pogozhev</ListItem>
            <ListItem style={{
                background: 'tomato'
            }}> 1.6. Принимая данную Оферту, Заказчик, тем самым, от своего имени и от имени  любых иных лиц, заинтересованных в определяемых данным Договором услугах,  выражает свое согласие с тем, что настоящие условия не ущемляют его законных  прав.</ListItem>
            <ListButton>Применить</ListButton>
        </List>
        <List
            style={{
                background: 'tomato'
            }}
        >
            <ListItem>Artificial Intelligence</ListItem>
            <ListItem><p>
            1.6. Принимая данную Оферту, Заказчик, тем самым, от своего имени и от имени  любых иных лиц, заинтересованных в определяемых данным Договором услугах,  выражает свое согласие с тем, что настоящие условия не ущемляют его законных  прав. <b style={{background: "yellow"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint animi, perferendis velit doloremque eius reiciendis temporibus nihil qui soluta sunt harum nemo beatae nostrum. Fuga inventore recusandae obcaecati voluptatibus ullam?</b></p></ListItem>
            <ListButton>Применить</ListButton>
        </List>
      </Page>
    </Popup>
}

export default a;