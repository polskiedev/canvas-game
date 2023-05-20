/*global describe, it*/
var toxi = require('./index'),
	assert = require('assert');

describe('TColor', function(){
	describe('static factories', function(){
        describe('rgbToHSV', function(){
            it('should create 0.16667 0 0 ', function(){
               var hsv = toxi.color.TColor.rgbToHSV( 1, 1, 0 );
               assert.ok( hsv[0] > 0.16 && hsv[0] < 0.17 );
                assert.equal( hsv[1], 1 );
                assert.equal( hsv[2], 1 );
            });
        });

		describe('newRGBA', function(){
			var c = toxi.color.TColor.newRGBA(0.75,0.5,0.25,1.0);
			it('should have correct rgba values', function(){
				assert.equal( c.red(), 0.75 );
				assert.equal( c.green(), 0.5 );
				assert.equal( c.blue(), 0.25 );
				assert.equal( c.alpha(), 1.0 );
			});
		});
		describe('newHSV', function(){
			var c = toxi.color.TColor.newHSV( 0.25, 0.5, 0.75 );
			it('should have correct hsva values', function(){
				assert.equal( c.hue(), 0.25 );
				assert.equal( c.saturation(), 0.5 );
				assert.equal( c.brightness(), 0.75 );
				assert.equal( c.alpha(), 1.0 );
			});
		});
        describe('newHSVA', function(){
            var c = toxi.color.TColor.newHSVA( 0.9, 0.75, 0.5, 0.25 );
            it('should have correct hsva values', function(){
                assert.equal( c.hue(), 0.9);
                assert.equal( c.saturation(), 0.75);
                assert.equal( c.brightness(), 0.5);
                assert.equal( c.alpha(), 0.25);
            });
            it('should modulate hue and clip saturation, brightness + alpha values',function(){
                var c = toxi.color.TColor.newHSVA( 1, 1.5, 2, 1 );
                assert.equal( c.hue(), 0 );
                assert.equal( c.saturation(), 1.0 );
                assert.equal( c.brightness(), 1 );
                assert.equal( c.alpha(), 1);
            });
        });
		describe('newCSS', function(){
			describe('width X11 css name', function(){
				//case-insensitive
				var color = toxi.color.TColor.newCSS( 'MedIuMAqUamarine' );
				it('should return X11 Aquamarine', function(){
					assert.equal(color.red(),102/255);
					assert.equal(color.green(), 205/255);
					assert.equal(color.blue(), 170/255);
				});
			});
			describe('with #00ff00 format', function(){
				var color = toxi.color.TColor.newCSS( '#00ffff');
				it('should return rgb 0,1,1', function(){
					assert.equal(color.red(), 0);
					assert.equal(color.green(), 1);
					assert.equal(color.blue(), 1);
				});
			});

			//using awkward spaces to test stripping it out
			describe('with rgba() string', function(){
				var color = toxi.color.TColor.newCSS( 'rgba ( 128, 128, 128,   0.5)' );
				it('should return 50% gray', function(){
					assert.equal(color.red(), 128/255);
					assert.equal(color.green(), 128/255);
					assert.equal(color.blue(), 128/255);
					assert.equal(color.alpha(), 0.5);
				});
			});

			describe('with rgb() string', function(){
				var color = toxi.color.TColor.newCSS( 'rgb(128,   128, 128)' );
				it('should return 50% gray', function(){
					assert.equal(color.red(), 128/255);
					assert.equal(color.green(), 128/255);
					assert.equal(color.blue(), 128/255);
					assert.equal(color.alpha(), 1.0);
				});
			});

			describe('with hsla() string', function(){
				it('should return an hsla color', function(){
					var clr = toxi.color.TColor.newCSS( 'hsla( 270, 50%, 75%, 0.5 )' );
					assert.equal(clr.hue(), 0.75 );
					assert.equal(clr.saturation(), 0.5 );
					assert.equal(clr.brightness(), 0.75 );
					assert.equal(clr.alpha(), 0.5);
				});
			});
		});
	});

	describe("prototype functions", function(){
		var c = toxi.color.TColor.newRGBA(0.75,0.5,0.25,1.0);


        describe('#getClosestHue( primaryOnly )', function(){
            var c1 = toxi.color.TColor.newHSV(toxi.color.Hue.LIME.getHue()+0.01, 1.0, 1.0);
            it('should return the closest Hue', function(){
                assert.equal( c1.getClosestHue(), toxi.color.Hue.LIME );
            });
            it('should return the closest primary hue', function(){
                assert.equal( c1.getClosestHue( true ), toxi.color.Hue.GREEN );
            });
        });

		describe('#equals()', function(){
			it('should return that the colors were equal', function(){
				var c1 = toxi.color.TColor.newRGBA( 0, 1.0, 0, 1.0 );
				var c2 = c1.copy();
				assert.ok( c1.equals( c2 ) );
			});
		});

		describe('#toARGB()', function(){
			it('should return proper packed integer', function(){
				assert.equal( c.toARGB(), -4227265 );
			});
		});

		describe('#toCMYKArray([])', function(){
			var cmyka = c.toCMYKAArray([]);
			it('should be c0, m0.25, y0.5, k0.25, a1.0]', function(){
				assert.equal(cmyka[0],0 );
				assert.equal(cmyka[1],0.25);
				assert.equal(cmyka[2],0.5 );
				assert.equal(cmyka[3],0.25 );
				assert.equal(cmyka[4],1.0 );
			});
		});

		describe('#toHex([])', function(){
			var hex = c.toHex();
			it("should be 'bf7f3f'", function(){
				assert.equal( hex, "bf7f3f" );
			});
		});
		describe("#toHSVAArray([])", function(){
			var hsva = c.toHSVAArray([]);
			//values confirmed in java
			it('should equal [ 0.083333336, 0.6666667, 0.75, 1.0 ]', function(){
				assert.ok(hsva[0] >0.083 && hsva[0] < 0.84);
				assert.ok(hsva[1] > 0.6 && hsva[1] < 0.67);
				assert.equal( hsva[2], 0.75 );
				assert.equal(hsva[3],1.0);
			});
		});

		describe("#toRGBAArray([])", function(){
			var rgba = c.toRGBAArray([]);
			it('should equal [ 0.75, 0.5, 0.25, 1.0 ]', function(){
				assert.equal( rgba[0],0.75 );
				assert.equal( rgba[1],0.5 );
				assert.equal( rgba[2],0.25 );
				assert.equal( rgba[3],1.0 );
			});
		});

        describe("#toRGBACSS()", function(){
            var red = toxi.color.TColor.newHex('ff0000').setAlpha(0.75);

            it('should equal "rgba(255,0,0,0.75)"', function(){
                assert.equal(red.toRGBACSS(), "rgba(255,0,0,0.75)");
            });

            it('should return "rgba(100%, 0%, 0%, 0.75)"', function(){
                assert.equal(red.toRGBACSS(true), "rgba(100%,0%,0%,0.75)");
            });

        });

        describe("#toRGBCSS()", function(){
            var red = toxi.color.TColor.newHex('ff0000').setAlpha(0.75);

            it('should equal "rgb(255,0,0)"', function(){
                assert.equal(red.toRGBCSS(), "rgb(255,0,0)");
            });

            it('should return "rgba(100%, 0%, 0%, 0.75)"', function(){
                assert.equal(red.toRGBCSS(true), "rgb(100%,0%,0%)");
            });
        });


        describe("#toHSLACSS()", function(){
            var red = toxi.color.TColor.newHex('ff0000').setAlpha(0.75);

            it('should equal "hsla(0,100%,100%,0.75)"', function(){
                assert.equal(red.toHSLACSS(), "hsla(0,100%,100%,0.75)");
            });
        });

        describe("#toHSLCSS()", function(){
            var red = toxi.color.TColor.newHex('ff0000').setAlpha(0.75);

            it('should equal "hsl(0,100%,100%)"', function(){
                assert.equal(red.toHSLCSS(), "hsl(0,100%,100%)");
            });
        });

		describe("build typed array with offset", function(){

			function testHSVA( arr ){
				assert.ok(arr[0] >0.083 && arr[0] < 0.84);
				assert.ok(arr[1] > 0.6 && arr[1] < 0.67);
				assert.equal( arr[2], 0.75 );
				assert.equal(arr[3], 1.0);
			}
			var arr = new Float32Array( 8 );
			describe("#toHSVAArray( float32Array ) then #toRGBAArray( float32Array, 4 )", function(){
				it('should equal [ 0.083333336, 0.6666667, 0.75, 1.0 ]', function(){
					c.toHSVAArray( arr );
					testHSVA( arr );
				});
				it('should retain same values', function(){
					c.toRGBAArray( arr, 4 );
					testHSVA( arr );
					assert.equal(arr[4],0.75 );
					assert.equal(arr[5],0.5 );
					assert.equal(arr[6],0.25 );
					assert.equal(arr[7],1.0 );
				});
			});
		});
	});
});
