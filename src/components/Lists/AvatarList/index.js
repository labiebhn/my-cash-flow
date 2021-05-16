import React from 'react';
import { Avatar, Button, Icon, ListItem } from '@ui-kitten/components';
import { ContentStruk } from '../../../assets/images';
import { Image } from 'react-native';

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out'/>
);


const InstallButton = (props) => (
  <Button size='tiny' appearance="ghost" accessoryLeft={LogoutIcon} />
);

const ItemImage = (props) => (
  <Image 
    style={[props.style, { borderRadius: 80 }]}
    source={ContentStruk}
  />
);

export const AvatarList = ({ name, role }) => (
  <ListItem
    title={role}
    description={name}
    accessoryLeft={ItemImage}
    accessoryRight={InstallButton}
  />
);