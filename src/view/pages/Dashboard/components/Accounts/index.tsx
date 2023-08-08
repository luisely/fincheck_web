import { Swiper, SwiperSlide } from "swiper/react";
import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { SliderNavigation } from "./SliderNavigation";

import 'swiper/css';
import useAccountsController from "./useAccountsController";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { Spinner } from "../../../../components/Spinner";
import { PlusIcon } from "@radix-ui/react-icons";
import { Mousewheel } from 'swiper/modules';

export function Accounts() {
  const {
    sliderState,
    setSlideState,
    windowWidth,
    areValuesVisible,
    toggleValueVisible,
    isLoading,
    accounts,
    openNewAccountModal,
    totalCurrentBalance
  } = useAccountsController()

  return (
    <div className="bg-teal-600 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="fill-white text-teal-700/50 w-12 h-12"/>
        </div>
      )}

      {!isLoading && (
        <>
          <div>
          <span className="text-white tracking-tight block">Saldo total</span>

          <div className="flex items-center gap-2">
            <strong data-visible={areValuesVisible} className="text-2xl tracking-[-1px] text-white data-[visible=true]:blur-md">

              {!areValuesVisible ? formatCurrency(totalCurrentBalance) : 'NOT_VISIBLE'}
            </strong>


            <button 
              onClick={toggleValueVisible}
              className="w-8 h-12 flex items-center justify-center"
            >
              <EyeIcon open={!areValuesVisible} />
            </button>
          </div>
        </div>
          
        <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
          {accounts.length === 0 && (
            <>
              <div className="mb-4" slot="container-start">
                <strong className="text-white tracking-[-1px] text-lg">Minhas Contas</strong>
              </div>

              <button
                onClick={openNewAccountModal}
                className="mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-200 flex flex-col items-center justify-center gap-4 text-white hover:bg-teal-700/30"
              >
                <div className="w-11 h-11 rounded-full border-2 border-dashed border-white flex items-center justify-center">
                  <PlusIcon className="w-6 h-6" />
                </div>
                <span className="tracking-tight font-medium block w-32 text-center">Cadastre uma nova conta</span>
              </button>
            </>

          )}

          {accounts.length > 0 && (
            <>
            <div>
              <Swiper
                mousewheel={true}
                spaceBetween={16}
                modules={[Mousewheel]}
                slidesPerView={windowWidth >= 500 ? 2.2 : 1.2} 
                onSlideChange={swiper => {
                setSlideState({
                  isBeginnig: swiper.isBeginning,
                  isEnd: swiper.isEnd
                })
              }}>
                <div className="flex items-center justify-between mb-4" slot="container-start">
                  <strong className="text-white tracking-[-1px] text-lg">Minhas Contas</strong>

                  <SliderNavigation isBeginning={sliderState.isBeginnig} isEnd={sliderState.isEnd} />
                </div>

                {accounts.map((account) => (
                  <SwiperSlide key={account.id}>            
                    <AccountCard data={account} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
          )}

          
        </div>
      </>
      )}
    </div>
  )
}
