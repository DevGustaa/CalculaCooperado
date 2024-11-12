import { ScrollView, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import Constants from "expo-constants"
import { useState } from "react";

const StatusBarHeight = Constants.statusBarHeight

export default function Index() {

  //Coletar dados de valores.
  const [ValueP, SetValueP] = useState("")
  const [ValuePF, SetValuePF] = useState("")
  const [ValueN, SetValueN] = useState("")
  const [ValueNF, SetValueNF] = useState("")
  const [ValueINSS, SetValueINSS] = useState("")
  const [ValueTaxa, SetValueTaxa] = useState("")

  //Coletar dados de horas.
    const [HoraP, SetHoraP] = useState("")
    const [MinP, SetMinP] = useState("")
    const [HoraPF, SetHoraPF] = useState("")
    const [MinPF, SetMinPF] = useState("")
    const [HoraN, SetHoraN] = useState("")
    const [MinN, SetMinN] = useState("")
    const [HoraNF, SetHoraNF] = useState("")
    const [MinNF, SetMinNF] = useState("")

  //Valores para divulgação
  const [ValueLiq, SetValueLiq] = useState(0)
  const [ValueTaxaADM, SetValueTaxaADM] = useState(0)
  const [ValueDescINSS, SetValueDescINSS] = useState(0)
  const [ValueIRRF, SetValueIRRF] = useState(0)

function TotalValorP () { //Valor diurno semana.
    let HorasTotais = Number(MinP || 0)/ 60 + Number(HoraP || 0)
    let TotalP = Number(HorasTotais) * Number(ValueP || 0)
    return TotalP
}

function TotalValorPF() { //Valor diurno fim de semana.
    let HorasTotais = Number(MinPF || 0) / 60 + Number(HoraPF || 0)
    let TotalPF = HorasTotais * Number(ValuePF || 0)
    return TotalPF
}

function TotalValorN () { //Valor noturno semana.
    let HorasTotais = Number(MinN || 0) / 60 + Number(HoraN || 0)
    let TotalN = HorasTotais * Number(ValueN || 0)
    return TotalN
}

function TotalValorNF () { //Valor noturno fim de semana.
    let HorasTotais = Number(MinNF || 0) / 60 + Number(HoraNF || 0)
    let TotalNF = HorasTotais * Number(ValueNF || 0)
    return TotalNF
}

function SomaTotal (){ //Somatorio total do valor Bruto
    let TotalP = TotalValorP()
    let TotalPF = TotalValorPF()
    let TotalN = TotalValorN()
    let TotalNF = TotalValorNF()
    
    let ValorBruto = TotalP + TotalN + TotalPF + TotalNF 
    return ValorBruto
}

function DescontoINSS (){ //Calculo do desconto de INSS somente para mostrar
    let ValorBruto = SomaTotal()
    let ValorDesconto = ValorBruto * (Number(ValueINSS || 20) / 100)
    return ValorDesconto      
}

function TotalINSS (){ //Valor total após INSS
    let ValorBruto = SomaTotal()
    let ValorINSS = ValorBruto - ValorBruto * (Number(ValueINSS || 0) / 100)
    return ValorINSS
}

function TaxaAdmin () { //Valor do desconto da taxa de administração
    let ValorBruto = SomaTotal()
    let TaxaAdm = Number(ValueTaxa || 0)/100 * ValorBruto
    return TaxaAdm
}

function Salario() { //Função final para valor Líquido
    
    let ValorDescINSS = DescontoINSS(); //Valor do desconto do INSS
    SetValueDescINSS(ValorDescINSS)

    let ValorINSS = TotalINSS(); //Valor total após INSS

    let TaxaAdm = TaxaAdmin(); //Valor taxa Administração
    SetValueTaxaADM(TaxaAdm)

    if (ValorINSS <= 2259.21){
        let TotalLiq = ValorINSS - TaxaAdm 
        let TaxaIRLiq = 0
        SetValueLiq(TotalLiq)
        SetValueIRRF(TaxaIRLiq)

    } else if (ValorINSS >= 2259.51 && ValorINSS <= 2826.65){
        let TaxaIRBruta = ValorINSS * 0.075 //valor do imposto de renda Bruto.
        let TaxaIRLiq = TaxaIRBruta - 169.44 //Valor do imposto de renda menos aliquota.
        let TotalLiq = ValorINSS - TaxaAdm - TaxaIRLiq //Valor total líquido.
        SetValueLiq(TotalLiq)
        SetValueIRRF(TaxaIRLiq)

    } else if (ValorINSS >= 2826.66 && ValorINSS <= 3751.05) {
        let TaxaIRBruta = ValorINSS * 0.15
        let TaxaIRLiq = TaxaIRBruta - 381.44
        let TotalLiq = ValorINSS - TaxaAdm - TaxaIRLiq
        SetValueLiq(TotalLiq)
        SetValueIRRF(TaxaIRLiq)

    } else if (ValorINSS >=3751.06 && ValorINSS <= 4664.68){
        let TaxaIRBruta = ValorINSS * 0.225
        let TaxaIRLiq = TaxaIRBruta - 662.77
        let TotalLiq = ValorINSS - TaxaAdm - TaxaIRLiq
        SetValueLiq(TotalLiq)
        SetValueIRRF(TaxaIRLiq)

    } else if (ValorINSS > 4664.69) {
        let TaxaIRBruta = ValorINSS * 0.275
        let TaxaIRLiq = TaxaIRBruta - 896
        let TotalLiq = ValorINSS - TaxaAdm - TaxaIRLiq
        SetValueLiq(TotalLiq)
        SetValueIRRF(TaxaIRLiq)

    } else if (ValorINSS > 9999){

    }
    


}
  return (
    <ScrollView className="bg-BackgColor">

      <View className=" h-[28vh] w-full items-center justify-start flex-collum gap-y-3" style={{marginTop: StatusBarHeight}}>
        <Text className="text-white text-2xl font-light">Valores da Cooperativa</Text>
        <View className="w-full flex-row px-1 gap-x-7">
          <TextInput keyboardType="numeric" maxLength={5} className="rounded-xl w-40 h-10 bg-white placeholder:p-2" placeholder="Valor plantão P" value={ValueP} onChangeText={(text) => SetValueP(text)}></TextInput>
          <TextInput keyboardType="numeric" className="rounded-xl w-40 h-10 bg-white placeholder:p-2" placeholder="Valor plantão PF" value={ValuePF} onChangeText={(text) =>  SetValuePF(text)}></TextInput>
        </View>
        <View className="w-full flex-row px-1 gap-x-7">
          <TextInput keyboardType="numeric" className="rounded-xl w-40 h-10 bg-white placeholder:p-2" placeholder="Valor plantão N" value={ValueN} onChangeText={(text) => SetValueN(text)}></TextInput>
          <TextInput keyboardType="numeric" className="rounded-xl w-40 h-10 bg-white placeholder:p-2" placeholder="Valor plantão NF" value={ValueNF} onChangeText={(text) => SetValueNF(text)}></TextInput>
        </View>
        <View className="w-full flex-row px-1 gap-x-7">
          <TextInput keyboardType="numeric" className="rounded-xl w-40 h-10 bg-white placeholder:p-2" placeholder="Taxa administrativa" value={ValueTaxa} onChangeText={(text) => SetValueTaxa(text)}></TextInput>
          <TextInput keyboardType="numeric" className="rounded-xl w-40 h-10 bg-white placeholder:p-2" placeholder="Taxa INSS" value={ValueINSS} onChangeText={(text) => SetValueINSS(text)}></TextInput>
        </View>
      </View>

      <View className=" w-full h-[35vh] items-center justify-start gap-y-3">
        <Text className="text-white text-2xl font-light">Horas mensais</Text>
        <View className="w-full flex-row px-1 gap-x-7">
          <TextInput keyboardType="numeric" maxLength={3} className="rounded-xl w-40 h-10 bg-white placeholder:p-2" placeholder="Horas plantão P" value={HoraP} onChangeText={(text) => SetHoraP(text)}></TextInput>
          <TextInput keyboardType="numeric" maxLength={3} className="rounded-xl w-40 h-10 bg-white placeholder:p-2" placeholder="Minutos plantão P" value={MinP} onChangeText={(text) => SetMinP(text)}></TextInput>
        </View>
        <View className="w-full flex-row px-1 gap-x-7">
          <TextInput keyboardType="numeric" maxLength={3} className="rounded-xl w-40 h-10 bg-white placeholder:p-2" placeholder="Horas plantão PF" value={HoraPF} onChangeText={(text) => SetHoraPF(text)}></TextInput>
          <TextInput keyboardType="numeric" maxLength={3} className="rounded-xl w-40 h-10 bg-white placeholder:p-2" placeholder="Minutos plantão PF" value={MinPF} onChangeText={(text) => SetMinPF(text)}></TextInput>
        </View>
        <View className="w-full flex-row px-1 gap-x-7">
          <TextInput keyboardType="numeric" maxLength={3} className="rounded-xl w-40 h-10 bg-white placeholder:p-2" placeholder="Horas plantão N" value={HoraN} onChangeText={(text) => SetHoraN(text)}></TextInput>
          <TextInput keyboardType="numeric" maxLength={3} className="rounded-xl w-40 h-10 bg-white placeholder:p-2" placeholder="Minutos plantão N" value={MinN} onChangeText={(text) => SetMinN(text)}></TextInput>
        </View>
        <View className="w-full flex-row px-1 gap-x-7">
          <TextInput keyboardType="numeric" maxLength={3} className="rounded-xl w-40 h-10 bg-white placeholder:p-2" placeholder="Horas plantão NF" value={HoraNF} onChangeText={(text) => SetHoraNF(text)}></TextInput>
          <TextInput keyboardType="numeric" maxLength={3} className="rounded-xl w-40 h-10 bg-white placeholder:p-2" placeholder="Minutos plantão NF" value={MinNF} onChangeText={(text) => SetMinNF(text)}></TextInput>
        </View>
      </View>
      
      <View className=" w-full h-[7vh] items-center justify-start">
        <TouchableOpacity className="rounded-2xl items-center justify-center w-24 h-12 border-gray-600 border bg-white" onPress={Salario}>
          <Text className="text-lg text-gray-600">Calcular</Text>
        </TouchableOpacity>
      </View>

      <View className=" w-full h-[24.5vh] justify-center items-center">
        <View className="bg-BackgCartao w-80 h-44 rounded-2xl border border-BrancoC">

          <View className="  w-[100%] h-[30%] rounded-t-2xl flex-row items-center justify-between px-4 font-medium">
            <Text className="text-white text-sm">Saldo do mês: {ValueLiq.toFixed(2)}</Text>
            <Text className="text-white">CalculaCoop</Text>
          </View>

          <View className="w-[100%] h-[25%] items-start justify-center px-4">
            <Image className="w-16 h-16" source={require('../../assets/images/goldenchip.png')}/>
          </View>

          <View className="w-[100%] h-[45%] rounded-b-2xl px-4">
            <View className="w-[100%] h-[100%] justify-between flex-row">
              <View>
                <Text className="text-white text-sm">Valor do INSS: {ValueDescINSS.toFixed(2)}</Text>
                <Text className="text-white text-sm">Valor do ADM: {ValueTaxaADM.toFixed(2)}</Text>
                <Text className="text-white text-sm">Valor do IRRF: {ValueIRRF.toFixed(2)} </Text>
              </View>
              <View className="items-end justify-end py-6 px-3">
                <Text>?</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View className="bg-white w-full h-[7vh]"></View>
    </ScrollView>
  );
}

