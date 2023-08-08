import { Swiper, SwiperSlide } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { Spinner } from "../../../../components/Spinner";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { SliderNavigation } from "./SliderNavigation";
import SliderOption from "./SliderOption";
import { UseTransactionsController } from "./UseTransactionsController";

import emptyStateImage from '../../../../../assets/empty-state.svg';
import { TypeDropdown } from "./TypeDropdown";
import { FiltersModal } from "./FiltersModal";
import { formatDate } from "../../../../../app/utils/formatDate";
import { EditTransactionModal } from "../../modals/EditTransactionModal";
import { Transition } from "@headlessui/react";

export function Transactions() {
  const {
    areValuesVisible,
    isInitialLoading,
    transactions,
    isLoading,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    isFilterModalOpen,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    handleCloseEditModal,
    handleOpenEditModal,
    isEditModalOpen,
    transactionToBeEdited,
    totalSpend,
    totalIncome
  } = UseTransactionsController()

  const hasTransactions = transactions.length > 0

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-3 md:p-10 flex flex-col">
      {isInitialLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="w-12 h-12"/>
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal 
            open={isFilterModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
          />
          <header>
            <div className="flex items-center justify-between">
              <TypeDropdown
                selectedType={filters.type}
                onSelect={handleChangeFilters('type')} 
              />
              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative z-0">
              <Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month}
                onSlideChange={swiper => {
                  handleChangeFilters('month')(swiper.realIndex)
                }}
              >
                  <SliderNavigation />
                  {MONTHS.map((month, idx) => (
                    <SwiperSlide key={month}>
                      {({ isActive }) => (
                        <SliderOption index={idx} month={month} isActive={isActive} />
                      )}
                    </SwiperSlide>  
                  ))}
              </Swiper>
            </div>
        </header>
        
        <Transition 
          show={!isLoading}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex items-center justify-center mx-2 text-xs mt-4">
            <div className="flex justify-center items-center gap-2 tracking-tight">
              <div className="flex text-center gap-1">
                <p>Total Receita: </p>
                <span className="text-emerald-700 font-medium">{formatCurrency(totalIncome)}</span>
              </div>
              <div className="flex text-center gap-1 ">
                <p>Total Despesa: </p>
                <span className="text-red-700 font-medium"> {formatCurrency(totalSpend)}</span>
              </div>
            </div>
          </div>
        </Transition>

        <div 
          data-loading={isLoading} 
          data-empty={!hasTransactions} 
          className="mt-4 space-y-2 md:data-[loading=true]:max-h-full md:data-[loading=true]:flex-1 md:data-[empty=true]:max-h-full md:data-[empty=true]:flex-1 md:max-h-[580px] overflow-y-auto"
        >

          {isLoading && (
            <div className="h-full flex flex-col items-center justify-center">
              <Spinner className="w-12 h-12"/> 
            </div>
          )}
          
          {(!hasTransactions && !isLoading) && (
            <div className="h-full flex flex-col items-center justify-center">
              <img src={emptyStateImage} alt="Empty State Cover" />
              <p className="text-gray-700">Não encontramos nenhuma transação</p>
            </div>
          )}

         {(hasTransactions && !isLoading) && (
          <>
            
            {transactionToBeEdited && (
              <EditTransactionModal
                open={isEditModalOpen}
                onClose={handleCloseEditModal}
                transaction={transactionToBeEdited}
              />
            )}

            {transactions.map(transaction => (
              <div
                role="button"
                onClick={() => handleOpenEditModal(transaction)}
                key={transaction.id}
                className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4 mx-2"
              >
                <div className="flex-1 flex items-center gap-3">
                  <CategoryIcon
                    type={transaction.type === 'EXPENSE' ? 'expense' : 'income'} 
                    category={transaction.category?.icon}
                  />

                  <div>
                    <strong className="font-bold tracking-tight block">{transaction.name}</strong>
                    <span className="text-sm text-gray-600">{formatDate(new Date(transaction.date))}</span>
                  </div>
                </div>

                <span
                  data-type={transaction.type}
                  data-visible={areValuesVisible}
                  className="data-[type=INCOME]:text-emerald-700 data-[type=EXPENSE]:text-red-700 tracking-tight font-medium data-[visible=true]:blur-sm">
                  {transaction.type === 'EXPENSE' ? '-' : '+'}  {!areValuesVisible ? formatCurrency(transaction.value) : 'NOT_VISIBLE'}
                </span>
              </div>
            ))}
          </>
         )}
        </div>

      </>
      )}

      
    </div>
  )
}
