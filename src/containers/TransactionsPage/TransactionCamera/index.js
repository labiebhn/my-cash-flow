'use strict';
import { Icon } from '@ui-kitten/components';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import { ScreenLoader } from '../../../components/Loaders';
import { evidenceTransaction } from '../../../store/actions/transactionAction';

class TransactionCamera extends PureComponent {

  state = {
    text: null,
    point: null,
    value: null,
    store: [],
  }

  stringCatcher = (str) => {
    let strSplit = str.split("\n"); //REMOVE NEW LINE TEXT AND CATCH [0]
    let resultChar = strSplit[0].toLowerCase(); //JOIN ARRAY FOR MAKE A CHAR
    // console.log('Split: ', resultChar);
    return resultChar;
  }

  integerCatcher = (str) => {
    let strSplit = str.split("\n"); //REMOVE NEW LINE TEXT AND CATCH [0]
    let regEx = /[^., RrPp]/g; //REMOVE [DOT], [COMMA], [SPACE], [Rp]
    let resultChar = strSplit[0].match(regEx).join(''); //JOIN ARRAY FOR MAKE A CHAR
    // console.log('Split: ', resultChar);
    return parseInt(resultChar);
  }

  findTotal = (textBlocks, index) => {
    let textNew = null;
    let valueNew = this.state.value;
    let storeNew = this.state.store;
    if (index) {
      let iStart = index - 1;
      let storeTotal = 0;
      for (let i = iStart; i <= iStart + 2; i++) {
        let total = this.integerCatcher(textBlocks[i].value);
        if (total) {
          // MAKE SURE FOR CATCH TOTAL
          if (this.integerCatcher(textBlocks[i].value) < storeTotal);
          textNew = textBlocks[i];
          valueNew = this.integerCatcher(textBlocks[i].value);
          storeNew.push(valueNew);
          storeTotal = valueNew;
        }
      }
    }
    this.setState({
      text: textNew,
      value: valueNew,
      store: storeNew,
    })
  }

  handleTextRecognized = async (textBlocks) => {
    let index = null;
    // console.log(textBlocks);
    if (textBlocks || textBlocks[0]) {
      await textBlocks.map((textBlocks, i) => {
        const strCatch = this.stringCatcher(textBlocks.value);
        const triggerChar = [
          'total', 'total penjualan', 'jumlah',
          'total yang dibayar', 'grand total'
        ];
        if (triggerChar.includes(strCatch)) {
          return index = i;
        }
      });
    }
    this.findTotal(textBlocks, index);
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onTap={(e) => this.setState({ point: e })}
          autoFocusPointOfInterest={this.state.point ? { x: this.state.point.x, y: this.state.point.y } : null}
          onTextRecognized={({ textBlocks }) => this.handleTextRecognized(textBlocks)}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <ScreenLoader />;
            return (
              <View style={styles.captureContainer}>
                <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                  <Icon style={styles.icon} fill="#ffff" name="radio-button-off" />
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
        {
          this.state.text ?
            <BoxList
              position={{
                x: this.state.text.bounds.origin.x,
                y: this.state.text.bounds.origin.y
              }}
              value={formatNumber(this.state.value)}
            />
            : null
        }
      </View>
    );
  }

  takePicture = async function (camera) {
    const options = { quality: 0.5, base64: false };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line

    this.props.evidenceTransaction(data);
    this.props.navigation.goBack();
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    evidenceTransaction: (data) => dispatch(evidenceTransaction(data))
  }
};

export default connect(null, mapDispatchToProps)(TransactionCamera);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    alignSelf: 'center',
    margin: 20,
  },
  icon: {
    width: 80,
    height: 80,
  },
});