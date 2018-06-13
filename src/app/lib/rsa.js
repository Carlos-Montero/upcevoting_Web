

import * as bigInt from 'big-integer/BigInteger';

export function messageToInt(strMsg) {
    let hexMsg = Buffer.from(strMsg, 'utf8').toString('hex');
    return bigInt(hexMsg, 16);
};

function getPrime(bitLength) {
    let prime = bigInt(4);
    while (!bigInt(prime).isPrime()) {
        prime = bigInt.randBetween(bigInt(2).pow(bitLength), bigInt(2).pow(bitLength+1));
    }
  
    return prime;
  }
  

export function generateRandomKeys(bitLength = 512) {
    let p, q, n, phi, e, d;

    p = getPrime(bitLength);
    q = getPrime(bitLength);
    n = p.multiply(q);
     
    phi = p.minus(1).multiply(q.minus(1));
    e = bigInt(65537); //Fermat prime number
    d = e.modInv(phi);

    const publicKey = new RSAPublicKey(e, n);
    const privateKey = new RSAPrivateKey(d,n);
    
    return { publicKey, privateKey };

}

export const RSAPublicKey = class RSAPublicKey {

    constructor(e,n) {
        this.e = bigInt(e);
        this.n = bigInt(n);
    };

    encrypt(m) {
        // E[m] = m^e mod n
        return m.modPow(this.e, this.n);   
    };

    blind(m) {
      // Alice compute an aleatory k, the blinding factor
        const k = bigInt.randBetween(this.e, this.n);
        // Alice blinds the message, m'= m*(k^e mod n)
        return {f: k, blinded: messageToInt(m).multiply(k.modPow(this.e,this.n))};
    };

    unblind(m, k) {
        // Alice computes de k inverse
        const kInv = k.modInv(this.n);
        // Alice computes sigma, s =  m'^k^-1 mod n
        return m.multiply(kInv).mod(this.n);
    };

    verify(s) {
        // alice unblinds it with sigma
        return s.modPow(this.e, this.n); // Verify
    };

    unsign(m) { // eliminar
        // m is the signed message
        // US[m] = m^d mod n
        return m.modPow(this.e, this.n)
    };
}

export const RSAPrivateKey = class RSAPrivateKey {
    constructor(d,n) {
        this.d = bigInt(d);
        this.n = bigInt(n);
    };

    decrypt(m) { 
        // m is the encrypted message
        // D[m] = m^d mod n
        return m.modPow(this.d, this.n);
    };

    sign(m) { 
        // Blinded m in case of blind signature
        // Alice computes sigma', s' =  m'^d mod n 
        return m.modPow(this.d,this.n);
    };
}

