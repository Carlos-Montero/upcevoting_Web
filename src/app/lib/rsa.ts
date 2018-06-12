import * as bigInt from 'big-integer/BigInteger';
//const crypto = require('crypto');

//const hash = (type, rand,  )
const generateRandomKeys = (bitLength = 2048) => {
    let p, q, n, phi, e, d;

    do {
        p = getPrime(bitLength / 2);
        q = getPrime(bitLength / 2);
        n = p.multiply(q);
    } while (q.compare(p) == 0 || n.bitLength() != bitLength);

    phi = p.minus(1).multiply(q.sub(1));
    e = bigInt(65537); //Fermat prime number
    d = e.modInv(phi);

    const publicKey = new RSAPublicKey(e, n);
    const privateKey = new RSAPrivateKey(d,n);

    return { publicKey, privateKey };

}

function getPrime(bitLength) {
    let prime= bigInt(43);
    while (!bigInt(prime).isPrime()) {
        prime = bigInt.randBetween(bigInt(2).pow(bitLength), bigInt(2).pow(bitLength+1));
    }

    return prime;
}

const RSAPublicKey = class RSAPublicKey {

    constructor(e,n) {
        this.e = bigInt(e).toString(16);
        this.n = bigInt(n).toString(16);
    };

    encrypt(m) {
        // E[m] = m^e mod n
        return m.modPow(this.e, this.n);
    };

    blind(m) {
        // Alice compute an aleatory k, the blinding factor
        this.k = bigInt.rand(this.n);
        // Alice blinds the message, m'= m*(k^e mod n)
        return m.multiply(this.k.modPow(this.e,this.n));
    };

    unblind(m) {
        // Alice computes de k inverse
        const kInv = this.k.modInv(this.n);
        // Alice computes sigma, s =  m'^k^-1 mod n
        return m.multiply(kInv).mod(this.n);
    };

    verify(s) {
        // alice unblinds it with sigma
        return s.modPow(this.e, this.n); // Verify
    };

    unsign(m) {
        // m is the signed message
        // US[m] = m^d mod n
        return m.modPow(this.e, this.n)
    };
}

const RSAPrivateKey = class RSAPrivateKey {
  public d: bigInt.BigInteger;
  public n: bigInt.BigInteger;
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

    getRand() {
        return this.n.randBetween(1,1000000);
    }
}

module.exports = {
    generateRandomKeys: generateRandomKeys,
    PrivateKey: RSAPrivateKey,
    PublicKey: RSAPublicKey
};
