
import { useRef, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';

export default function InvitationWidget({ auth }) {

    const [copied, setCopied] = useState(false);
    
    const invitation_link = auth.user && `${window.location.origin}/register?invite=` + `${auth.user.invitation_token}`;
    const invitationLinkRef = useRef(null);

    const copyToClipboard = () => {
        invitationLinkRef.current.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        setCopied(true);
    
        setTimeout(() => {
          setCopied(false);
        }, 500);
      };

    const shareToWhatsApp = () => {
        let message = `Hi! \nKy është linku për të krijuar nje account tek Asle Nails.\nDhuratat ju presin. \n${invitation_link} \nFaleminderit!`;
        let url = `https://api.whatsapp.com/send?text=${encodeURI(message)}&app_absent=0`;
        window.open(url);
    };

    const shareToEmail = () => {
        let subject = "Asle Nails Account Invitation";
        let body = `Hi!\nKy është linku për të krijuar nje account tek Asle Nails.\nDhuratat ju presin.\n${invitation_link}\nFaleminderit!`;

        let mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;
    };

    return auth.user.role === 'user' &&
        <div className='p-4 sm:p-8 sm:rounded-lg  bg-green-600 bg-opacity-10 md:bg-opacity-10 border-slate-500 border-opacity-30'>
            <h1 className='md:text-3xl text-xl font-bold flex gap-2'>
                <span className='my-auto text-green-600'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg></span>
                Invite your friend</h1>
            <p className='mt-1 md:text-base text-sm '>By sharing your invitation link to your friends you can win points if you have Asle Card</p>
            <div className='mt-4 relative bg-white md:border border-slate-600 border-opacity-30 shadow-sm rounded-lg w-full flex md:rounded-md'>
                <div className='w-full md:text-sm text-xs h-full p-3 relative items-center bg-transparent'>
                    <input
                        ref={invitationLinkRef}
                        type="text"
                        value={invitation_link}
                        readOnly
                        className='my-auto outline-none w-full border-none bg-transparent'
                    />
                </div>
                <button
                    onClick={copyToClipboard}
                    className='px-4 md:bg-slate-500 hover:bg-slate-600 hover:bg-opacity-10 after:bg-black md:bg-opacity-10 bg-opacity-10 rounded-r-md text-slate-700'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-copy" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
                    </svg>
                </button>
                <AnimatePresence>
              {copied && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35 }}
                  className="text-xs -mt-7 bg-white border px-2 py-1 right-1 absolute rounded-md"
                >
                  Copied!
                </motion.p>
              )}
            </AnimatePresence>
            </div>

            <div className='w-full mt-4 gap-2 flex'>
                <span className='w-full h-[1px] my-auto bg-black bg-opacity-20'></span>
                <span className='text-slate-600'>or</span>
                <span className='w-full h-[1px] my-auto bg-black bg-opacity-20'></span>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <button onClick={() => shareToWhatsApp()} className='bg-green-800 hover:bg-green-700 hover:bg-opacity-85 animation-all duration-150 px-10 flex h-12 items-center gap-2 relative w-full py-4 mt-3 rounded-md text-white bg-opacity-85'>
                    <span className='items-center flex gap-2 absolute left-1/2 -translate-x-1/2 '> Invite by
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                        </svg></span>
                </button>
                <button onClick={() => shareToEmail()} className='bg-blue-600 hover:bg-blue-700 hover:bg-opacity-85 animation-all duration-150 bg-opacity-90 text-white px-10 flex h-12 items-center gap-2 relative w-full py-4 mt-3 rounded-md  '>
                    <span className='items-center flex gap-2 absolute left-1/2 -translate-x-1/2 '> Invite by
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-at-fill" viewBox="0 0 16 16">
                            <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                            <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z" />
                        </svg></span>
                </button>
            </div>

        </div>

}