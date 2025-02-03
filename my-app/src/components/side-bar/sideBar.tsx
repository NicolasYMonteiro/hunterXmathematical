import React from "react";
import { TbX, TbHome, TbUser, TbSettings, TbLogout, TbArrowLeft, TbArrowRight } from "react-icons/tb";
import Link from "next/link";

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {

  return (
    <div
      className={`fixed inset-0 bg-black/50 z-[100] transition-opacity ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClose} // Fecha ao clicar fora
    >
     
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white p-6 shadow-lg transition-transform rounded-r-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro
      > 
        <div className="bg-gray-200">
          <p className="absolute text-2xl top-5 left-4">Menu</p>

          {/** Botão de fechar */}
          <button className="absolute top-3 right-4 text-2xl p-2 bg-gray-100 rounded-full border gray-300" onClick={onClose}>
            <TbX />
          </button> 
        </div>


        {/** Itens do sidebar */}
        <nav className="mt-16 space-y-4">

          <div className="space-x-2 flex w-full">
            <Link href="/home"  className="w-full flex items-center gap-3 p-3 rounded-2xl bg-gray-100 hover:bg-gray-100 border border-gray-300">
              <TbHome /> Início
            </Link>
            <Link href="/about" className="w-full flex items-center gap-3 p-3 rounded-2xl bg-gray-100 hover:bg-gray-100 border border-gray-300">
              <TbUser /> Sobre
            </Link>
          </div>
          
          <p className="text-2xl">Funções</p>
          <div className="space-y-2">
            <Link href="/function/related-function" className="w-full flex items-center gap-3 p-3 rounded-2xl bg-gray-100 hover:bg-gray-100 border border-gray-300">
              <TbArrowRight /> Função Afim
            </Link>  
            <Link href="/function/quadratic-function" className="w-full flex items-center gap-3 p-3 rounded-2xl bg-gray-100 hover:bg-gray-100 border border-gray-300">
              <TbArrowRight /> Função Quadrática
            </Link> 
            <Link href="/function/trig-function" className="w-full flex items-center gap-3 p-3 rounded-2xl bg-gray-100 hover:bg-gray-100 border border-gray-300">
              <TbArrowRight /> Função Trigonométrica
            </Link>            
          </div>


          <p className="text-2xl">Teoremas</p>
          <div className="space-y-2">
            <Link href="/theorem/pythagorean" className="w-full flex items-center gap-3 p-3 rounded-2xl bg-gray-100 hover:bg-gray-100 border border-gray-300">
              <TbArrowRight /> Teorema de Pitágoras
            </Link>            
          </div>


          {/** Rodapé */}
          <div className="absolute bottom-6 left-0 right-0 px-4 flex justify-between items-center">
          <Link href="/configuracoes" className="flex items-center gap-3 p-3 rounded-2xl bg-gray-100 hover:bg-gray-200 border border-gray-300 w-[75%]">
            <TbSettings /> Configurações
          </Link>

          <button
            className="p-3 bg-gray-100 hover:bg-red-200 border border-gray-300 rounded-full">
            <TbLogout className="text-red-600" />
          </button>
        </div>

        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;